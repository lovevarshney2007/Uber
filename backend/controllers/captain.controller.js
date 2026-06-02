const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res,next) => {
    const  errors = validationResult(req);
    if (!errors.isEmpty()) { 
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });

    if(isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain with this email already exists' });
    }   

    const hashedPassword = await captainModel.hashPassword(password);

    try {   
        const captain = await captainService.createCaptain({ 
            firstName:fullName.firstName, lastName:fullName.lastName,
             email,
              password: hashedPassword,
               color: vehicle.color,
                plateNumber: vehicle.plateNumber, capacity: vehicle.capacity, vehicleType: vehicle.vehicleType });

        const token = captain.generateAuthToken();

        res.status(201).json({ message: 'Captain registered successfully', token, captain });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}

module.exports.loginCaptain = async (req, res,next) => {
    const errors = validationResult(req);  
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;

    try {
        const captain = await captainModel.findOne({ email }).select('+password');
        if (!captain) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }   
        const isMatch = await captain.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = captain.generateAuthToken();
        res.cookie('token', token);
        res.status(200).json( {token,captain} );
    } catch (error) {
        return res.status(400).json({
            success: false,
            
            message: error.message
        });
    }   
}


module.exports.getCaptainProfile = async (req, res) => {
    try {
        const captain = req.captain;
        res.status(200).json({ captain });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }   
} 

module.exports.logoutCaptain = async (req, res) => {
   const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(400).json({ message: 'No token provided' });
    }

    await blacklistTokenModel.create({ token });
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
}  


