const crypto = require('crypto');
const User = require('../models/User');
const nodemailer = require('nodemailer');

// Function to send password reset email
const sendResetPasswordEmail = async (user, resetToken) => {
    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Password Reset Request',
        html: `<p>Click <a href="${resetURL}">here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
};
