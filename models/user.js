const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: String
});

const User = mongoose.model('users', userSchema);

exports.User = User;
exports.userSchema = userSchema;