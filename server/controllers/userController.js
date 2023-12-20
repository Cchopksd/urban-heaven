const { registerModel,
    checkUserExists,
    loginModel
} = require('../models/userModel')
// const session = require('../configs/sessionConfig')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerController = async (req, res) => {
    try {
        const userInfo = req.body

        const isValidEmail = (email) => {
            const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };

        if (!userInfo.username || !userInfo.user_email) {
            return res.status(400).json({ message: 'Username and email are required.' });
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

        const usernameExists = await checkUserExists('username', userInfo.username);
        const emailExists = await checkUserExists('user_email', userInfo.user_email);

        if (usernameExists) {
            return res.status(409).json({ message: 'Username already exists' });
        } else if (emailExists) {
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

exports.loginController = async (req, res, next) => {
    try {
        const { user_email, user_password } = req.body;
        // console.log(next)

        if (!user_email) {
            return res.status(404).json({ message: "Enter your email address" });
        } else if (!user_password) {
            return res.status(404).json({ message: "Enter your password" });
        }

        const userInfo = await loginModel(user_email)
        // console.log(userInfo)
        if (userInfo) {
            const isPasswordMatch = await bcrypt.compareSync(user_password, userInfo.user_password);
            const { user_email } = userInfo
            if (isPasswordMatch) {
                // console.log(userInfo)
                req.session.userInfo = userInfo
                console.log('Session created:', req.session.cookie);
                return res.status(200).json({ message: 'Login success', user_email })
            } else {
                return res.status(401).json({ message: 'Invalid email or password' })
            }
        }
        else {
            return res.status(401).json({ message: 'Invalid email or password' })
        }
    } catch (err) {
        res.status(500).json({ message: 'Internal Server Error' });
        throw err;
    }
}

exports.logoutController = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).json({ message: 'Internal server error' });

        } else {
            res.status(200).json({ success: true, message: 'Logout complete' });
        }
    })
}