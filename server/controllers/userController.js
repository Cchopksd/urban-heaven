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
        console.log(userInfo)
        const { name, surname, username, email, password, confirmPassword, phone, gender, date, month, year } = userInfo

        const isValidEmail = (email) => {
            const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };

        if (!username) {
            console.log(username)
            return res.status(400).json({ message: 'Username not empty' });
        }
        if (!email) {
            return res.status(400).json({ message: 'Username not empty' });
        }

        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'password not matched' });
        }

        if (name === "") {
            return res.status(400).json({ message: 'First name not empty' })
        }

        if (surname === "") {
            return res.status(400).json({ message: 'Last name not empty' })
        }

        if (phone === "") {
            return res.status(400).json({ message: 'Phone number not empty' })
        }
        if (gender === "") {
            return res.status(400).json({ message: 'gender not empty' })
        }
        if (!date && !month && !year) {
            return res.status(400).json({ message: 'Date of birth not empty' })
        }

        const emailExists = await checkUserExists('user_email', email);
        if (emailExists) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        const userID = uuidv4();
        await registerModel({ ...userInfo, userID })
        res.status(200).json({ message: 'Register successfully' });

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