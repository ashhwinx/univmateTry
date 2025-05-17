const twilio = require('twilio');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const otpStore = {}; // Temporary in-memory store for OTPs

module.exports.generateOTP = (email) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  otpStore[email] = { otp, expiresAt: Date.now() + 5 * 60 * 1000 }; // OTP valid for 5 minutes
  return otp;
};

module.exports.sendOTPViaEmail = async (email, otp) => {
  console.log(otp)
  const msg = {
    to: email,
    from: 'fedvexx@gmail.com', // Replace with a verified sender email
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  };
  try {
    await sgMail.send(msg);
    console.log('OTP email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending OTP email:', error.response ? error.response.body : error.message);
    throw new Error('Failed to send OTP email');
  }
};

module.exports.verifyOTP = (email, otp) => {
  const record = otpStore[email];
  if (!record || record.otp !== otp || Date.now() > record.expiresAt) {
    return false;
  }
  delete otpStore[email]; // Remove OTP after successful verification
  return true;
};