const Rajorpay = require('razorpay');
const instance = require('../config/razorpay');
const crypto = require('crypto');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
// BUGFIX: `paymentSuccessEmail` was used below but never imported, and the
// template file itself never existed - this threw a ReferenceError every
// time this function ran. Both are now created/imported.
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
require('dotenv').config();

const User = require('../models/user');
const Course = require('../models/course');
const CourseProgress = require("../models/courseProgress")
const Order = require('../models/order')


const { default: mongoose } = require('mongoose')


// ================ capture the payment and Initiate the 'Rajorpay order' ================
exports.capturePayment = async (req, res) => {

    // extract courseId & userId
    const { coursesId } = req.body;
    // console.log('coursesId = ', typeof (coursesId))
    // console.log('coursesId = ', coursesId)

    const userId = req.user.id;


    if (coursesId.length === 0) {
        return res.json({ success: false, message: "Please provide Course Id" });
    }

    let totalAmount = 0;

    for (const course_id of coursesId) {
        let course;
        try {
            // valid course Details
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(404).json({ success: false, message: "Could not find the course" });
            }

            // check user already enrolled the course
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({ success: false, message: "Student is already Enrolled" });
            }

            totalAmount += course.price;
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

    // create order
    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    // initiate payment using Rajorpay
    try {
        // BUGFIX (root cause #1 of "payment not working"): `instance` here
        // IS the Razorpay client itself (see config/razorpay.js -
        // `module.exports = instance`), but this code was calling
        // `instance.instance.orders.create(...)` - `.instance` doesn't
        // exist on it, so this threw a TypeError on every single purchase
        // attempt, before the Razorpay checkout modal could even open.
        const paymentResponse = await instance.orders.create(options);
        // return response
        res.status(200).json({
            success: true,
            message: paymentResponse,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, mesage: "Could not Initiate Order" });
    }

}



// ================ verify the payment ================
exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.coursesId;
    const userId = req.user.id;
    // console.log(' req.body === ', req.body)

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
        return res.status(400).json({ success: false, message: "Payment Failed, data not found" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    // BUGFIX (root cause #2): this read `process.env.RAZORPAY_SECRET`, which
    // does not exist - the actual env var (see config/razorpay.js and
    // backend/.env) is `RAZORPAY_KEY_SECRET`. `crypto.createHmac()` with an
    // undefined key throws, so verification crashed on every attempt - even
    // if bug #1 above were the only fix, checkout would open and take
    // payment, but the student would never actually get enrolled.
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        //enroll student
        await enrollStudents(courses, userId, res, {
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
        });
        //return res
        return res.status(200).json({ success: true, message: "Payment Verified" });
    }
    return res.status(200).json({ success: "false", message: "Payment Failed" });

}


// ================ enroll Students to course after payment ================
// BUGFIX / feature: this now also writes an Order record per course (see
// models/order.js) so the payment's amount, Razorpay IDs, and date are
// actually saved somewhere - previously nothing about the transaction
// itself was persisted, only the enrollment.
const enrollStudents = async (courses, userId, res, paymentInfo = {}) => {

    if (!courses || !userId) {
        return res.status(400).json({ success: false, message: "Please Provide data for Courses or UserId" });
    }

    for (const courseId of courses) {
        try {
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true },
            )

            if (!enrolledCourse) {
                return res.status(500).json({ success: false, message: "Course not Found" });
            }
            // console.log("Updated course: ", enrolledCourse)

            // Initialize course preogres with 0 percent
            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            })

            // Find the student and add the course to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(
                userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            )

            // console.log("Enrolled student: ", enrolledStudent)

            // BUGFIX: save an Order record for this course so Purchase
            // History has real data (amount, payment ID, date) to show.
            if (paymentInfo.razorpayOrderId && paymentInfo.razorpayPaymentId) {
                try {
                    await Order.create({
                        user: userId,
                        course: courseId,
                        amount: enrolledCourse.price,
                        razorpayOrderId: paymentInfo.razorpayOrderId,
                        razorpayPaymentId: paymentInfo.razorpayPaymentId,
                        status: "Success",
                    })
                } catch (orderError) {
                    // Enrollment already succeeded - don't fail the whole
                    // request just because the Order record failed to save,
                    // but do log it loudly so it's visible in server logs.
                    console.error("Failed to save Order record for course", courseId, orderError)
                }
            }

            // Send an email notification to the enrolled student
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )
            // console.log("Email Sent Successfully", emailResponse);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }

}



exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({ success: false, message: "Please provide all the fields" });
    }

    try {
        // find student
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount / 100, orderId, paymentId)
        )
    }
    catch (error) {
        console.log("error in sending mail", error)
        return res.status(500).json({ success: false, message: "Could not send email" })
    }
}


// ================ get logged-in student's Payment History ================
// Powers the frontend Purchase History page with real data: course name,
// amount actually paid, Razorpay payment ID, and the real purchase date -
// none of which existed anywhere before the Order model above was added.
exports.getPaymentHistory = async (req, res) => {
    try {
        const userId = req.user.id

        const orders = await Order.find({ user: userId })
            .populate("course", "courseName thumbnail")
            .sort({ createdAt: -1 })

        return res.status(200).json({
            success: true,
            data: orders,
        })
    } catch (error) {
        console.error("Error while fetching payment history", error)
        return res.status(500).json({
            success: false,
            message: "Could not fetch payment history",
        })
    }
}


// ================ verify Signature ================
// (unchanged - left commented out as in the original file)