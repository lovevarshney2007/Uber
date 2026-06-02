const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [
    body('fullName.firstName').notEmpty().withMessage('First name is required'),
    body('fullName.lastName').notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').notEmpty().withMessage('Vehicle color is required'),
    body('vehicle.plateNumber').notEmpty().withMessage('Vehicle plate number is required'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('Vehicle capacity must be at least 1'),
    body('vehicle.vehicleType').isIn(['car', 'auto', 'motorcycle']).withMessage('Vehicle type must be car, auto, or motorcycle')
], captainController.registerCaptain);


router.post('/login', [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
], captainController.loginCaptain);


router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

router.get('/logout', authMiddleware.authCaptain, captainController.logoutCaptain);

module.exports = router;