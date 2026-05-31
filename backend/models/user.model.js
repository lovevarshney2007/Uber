const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, 'Last name must be at least 3 characters long']
        },
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        match: [/\S+@\S+\.\S+/, 'Email must be a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        match: [/(?=.*[A-Z])(?=.*\d).+/, 'Password must contain at least one uppercase letter and one number'],
        select: false,
    },
    socketId: {
        type: String,
        default: null
    }
}, { timestamps: true });

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {  
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;