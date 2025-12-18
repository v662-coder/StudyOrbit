const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 5 * 60, // 5 minutes
  },
});

// function to send email
async function sendVerificationEmail(email, otp) {
  try {
    await mailSender(email, "Verification Email from StudyOrbit", otp);
    console.log("OTP Email sent successfully to:", email);
  } catch (error) {
    console.log("Error sending verification email:", error);
    throw new Error(error);
  }
}

// PRE SAVE MIDDLEWARE (must NOT use arrow function)
OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);
