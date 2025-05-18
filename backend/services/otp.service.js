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
  try {
    const msg = {
      to: email,
      from: {
        email: process.env.FROM_EMAIL,
        name: 'UnivMate'
      },
      subject: 'Your OTP for UnivMate Registration',
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0a51ad;">UnivMate OTP Verification</h2>
          <p>Your OTP code is: <strong style="font-size: 24px; color: #0a51ad;">${otp}</strong></p>
          <p>This code will expire in 5 minutes.</p>
        </div>
      `
    };

    await sgMail.send(msg);
    console.log('OTP email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('SendGrid Error:', error);
    if (error.response) {
      console.error(error.response.body);
    }
    throw new Error('Failed to send OTP email: ' + (error.message || 'Unknown error'));
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