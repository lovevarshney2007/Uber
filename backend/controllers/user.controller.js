const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } 

        const { fullName, email, password } = req.body;

        const isUserAlreadyExists = await userModel.findOne({ email });

        if(isUserAlreadyExists) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await userModel.hashPassword(password);
        
        const user = await userService.createUser({ firstName:fullName.firstName,lastName:fullName.lastName, email, password: hashedPassword });

        const token = user.generateAuthToken();
        const userObj = user.toObject();
        delete userObj.password;

        res.status(201).json({ message: 'User registered successfully', token, user: userObj });
    } catch (error) {
         return res.status(400).json({
            success: false,
            message: error.message
        });
    }
}  

module.exports.loginUser = async (req, res,next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }   
        const { email, password } = req.body;
        const user = await userModel.findOne({email}).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });

        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();

         res.cookie('token', token);

        const userObj = user.toObject();
        delete userObj.password;

        res.status(200).json({ message: 'Login successful', token, user: userObj });
    } catch (error) {
        next(error);
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json({ message: 'User profile retrieved successfully', user: req.user });
}   


module.exports.logoutUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(400).json({ message: 'No token provided' });
        }
        await blacklistTokenModel.create({ token });

        res.clearCookie('token');

        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        next(error);
    }  
}   