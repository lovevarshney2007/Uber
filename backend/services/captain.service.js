const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({ firstName, lastName, email, password, color, plateNumber, capacity, vehicleType }) => {
    try {
       if(!firstName || !lastName || !email || !password || !color || !plateNumber || !capacity || !vehicleType) {
        throw new Error('All fields are required');
       } 

       const captain = await captainModel.create({
        fullName: { firstName, lastName },
        email,
        password, 
        vehicle: {
            color,
            plateNumber,
            capacity,
            vehicleType
        }
       });
       
       return captain;
    }       
    catch (error) {
        throw new Error(error.message);
    }   
};