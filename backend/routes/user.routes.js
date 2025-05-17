const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require('../controllers/user.controller');
const authMiddleware = require("../middlewares/auth.middleware");
const otpService = require('../services/otp.service'); // Import OTP service

router.post("/register", [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname').isLength({ min: 6 }).withMessage('Fullname must be at least 6 characters long'),
    body('password').isLength({ min: 6 }).withMessage('ok password must be at least 6 character long'),
    body('semester').notEmpty().withMessage('Semester is required'),
    body('section').notEmpty().withMessage('section is required')
],
userController.registerUser
);


router.post('/login', [
    body('email').isEmail().withMessage("Invalid Email ok not"),
    body('password').isLength({ min: 6 }).withMessage('password must be at least 6 character long')
], userController.loginUser);

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);


// OTP Routes
router.post('/send-otp', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const otp = otpService.generateOTP(email);
    try {
        await otpService.sendOTPViaEmail(email, otp);
        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error in /send-otp route:', error.message);
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
});

router.post('/verify-otp', (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    const isValid = otpService.verifyOTP(email, otp);
    if (isValid) {
        res.status(200).json({ message: 'OTP verified successfully' });
    } else {
        res.status(400).json({ message: 'Invalid or expired OTP' });
    }
});

module.exports = router;