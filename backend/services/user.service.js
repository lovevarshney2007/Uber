const userModel = require('../models/user.model');

module.exports.createUser = async ({
    firstName, lastName, email, password
}) => {
    try {
        if(!firstName || !email || !password) {
            throw new Error('All fields are required');
        }

         const existingUser = await userModel.findOne({ email });

    if (existingUser) {
        throw new Error('User already exists');
    }

        const user = await userModel.create({
            fullName: {
                firstName,
                lastName
            },
            email,
            password
        });
        // await user.save();
        return user;
    } catch (error) {
        throw error;
    }   
}

