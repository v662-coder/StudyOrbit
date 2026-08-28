const mailSender = require("../utils/mailSender");

// ================ Contact Us ================
// BUGFIX: the frontend has always called POST /api/v1/reach/contact
// (see frontend/src/services/apis.js -> contactusEndpoint.CONTACT_US_API),
// but no matching route/controller ever existed on the backend, so every
// contact-form submission was silently failing with a 404. This adds the
// missing endpoint.
exports.contactUsController = async (req, res) => {
    try {
        const { firstname, lastname, email, message, phoneNo, countrycode } = req.body;

        if (!firstname || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email and message are required",
            });
        }

        const notifyAddress = process.env.MAIL_USER;

        if (notifyAddress) {
            await mailSender(
                notifyAddress,
                "New Contact Us Submission - Study Orbit",
                `
                <h3>New contact form submission</h3>
                <p><b>Name:</b> ${firstname} ${lastname || ""}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${countrycode || ""} ${phoneNo || "N/A"}</p>
                <p><b>Message:</b> ${message}</p>
                `
            );
        }

        return res.status(200).json({
            success: true,
            message: "Your message has been received. We'll get back to you soon.",
        });
    } catch (error) {
        console.log("Error while handling contact us submission");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while sending your message",
            error: error.message,
        });
    }
};
