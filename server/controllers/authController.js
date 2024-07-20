const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Import User model

exports.signupOrLogin = async (req, res) => {
    const { username, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        let user = await User.findOne({ email });

        if (user) {
            // User exists, proceed to login
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            
            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token, message: 'Login successful' });
        } else {
            // User does not exist, create new user
            if (!username) {
                return res.status(400).json({ message: 'Username is required for signup' });
            }
            
            const hashedPassword = await bcrypt.hash(password, 12);
            user = new User({ username, email, password: hashedPassword });
            await user.save();

            // Generate JWT token
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ token, message: 'User created and logged in successfully' });
        }
    } catch (err) {
        console.error('Error in signup or login:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Request Password Reset
exports.requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
        console.log(`Reset URL: ${resetUrl}`); // Log URL for debugging

        await transporter.sendMail({
            to: email,
            subject: 'Password Reset',
            html: `<p>To reset your password, click the following link: <a href="${resetUrl}">${resetUrl}</a></p>`,
        });

        res.status(200).json({ message: 'Password reset link sent' });
    } catch (err) {
        console.error('Password reset error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

// Reset Password
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ message: 'Token and new password are required' });
    }

    try {
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
