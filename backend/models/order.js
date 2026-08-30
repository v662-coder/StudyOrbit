const mongoose = require("mongoose");

// Records a single completed course purchase. Previously there was no
// model like this at all - a successful payment enrolled the student
// (added the course to User.courses) but nothing else was ever saved
// about the transaction itself, so there was no way to build a real
// Purchase History page (no amount paid, no payment ID, no purchase date).
const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        amount: {
            // stored in rupees (not paise) for easy display
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: "INR",
        },
        razorpayOrderId: {
            type: String,
            required: true,
        },
        razorpayPaymentId: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["Success", "Failed"],
            default: "Success",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);