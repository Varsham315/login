const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resetToken: { type: String, required: false },
    resetTokenExpiry: { type: Date, required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
