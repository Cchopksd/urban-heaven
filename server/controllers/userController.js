const { registerModel,
    checkUserExists,
    checkAllEmail,
    getAllUsersModel,
    EditProfileModel,
} = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');


exports.registerController = async (req, res) => {
    try {
        const userInfo = req.body

        const isValidEmail = (email) => {
            const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };

        if (!userInfo.username) {
            return res.status(400).json({ message: 'Username not empty' });
        }
        if (!userInfo.user_email) {
            return res.status(400).json({ message: 'Username not empty' });
        }

        if (!isValidEmail(userInfo.user_email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (userInfo.user_password !== userInfo.user_confirmPassword) {
            return res.status(400).json({ message: 'password not matched' });
        }

        if (userInfo.user_fname === "") {
            return res.status(400).json({ message: 'First name not empty' })
        }

        if (userInfo.user_lname === "") {
            return res.status(400).json({ message: 'Last name not empty' })
        }

        const emailExists = await checkUserExists('user_email', userInfo.user_email);
        if (emailExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const userId = uuidv4();
        await registerModel({ ...userInfo, userId })
        res.status(200).json({ message: 'Data added successfully' });

    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        throw err;
    }
}


exports.EditProfileController = async (req, res) => {
    try {
        const { user_params } = req.params
        const userInfo = req.body

        if (userInfo.fname === "") {
            return res.status(400).json({ message: 'First name not empty' })
        }

        if (userInfo.lname === "") {
            return res.status(400).json({ message: 'Last name not empty' })
        }

        await EditProfileModel(user_params, { ...userInfo });
        res.status(200).json({ message: 'Data update successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}


exports.getAllUsersControllers = async (req, res) => {
    try {
        const userInfo = await getAllUsersModel()
        res.status(200).json({ message: 'Get data successfully', userInfo });
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        throw err;
    }
}