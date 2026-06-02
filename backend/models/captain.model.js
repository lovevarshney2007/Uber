const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const captainSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true, 
            minlength: [3, 'First name must be at least 3 characters long']
        },
        lastName: { 
            type: String,
            minlength: [3, 'Full name must be at least 3 characters long']
        }
    },
    email: {  
        type: String,
        required: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: true, 
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false
    },
    socketId: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'available', 'on-trip'],
        default: 'inactive'
    },
    vehicle: {
        color:{
            type: String,
            required: true,
            minlength: [3, 'Vehicle color must be at least 3 characters long']
        },
        plateNumber: {
            type: String,
            required: true,
            minlength: [3, 'Plate number must be at least 3 characters long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Vehicle capacity must be at least 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'auto', 'motorcycle'],
        },
        location: {
                latitude: {
                    type: Number,
                },
                longitude: {
                    type: Number,
                }
            } 
    }
}); 


captainSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24d' });
    return token;
}

captainSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
} 

const CaptainModel = mongoose.model('Captain', captainSchema);

module.exports = CaptainModel;