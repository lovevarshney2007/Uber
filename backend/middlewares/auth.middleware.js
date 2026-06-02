const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const blacklistTokenModel = require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const isBlacklisted = await blacklistTokenModel.findOne({ token:token });

        if(isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized. Token is blacklisted.' });
         }

        try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = user;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', ''); 
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }   

   const isBlacklisted = await blacklistTokenModel.findOne({ token:token });
    if(isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized. Token is blacklisted.' });
     }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id).select('+password');   
        if (!captain) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.captain = captain;
        return next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }  
};  