const {
	registerModel,
	checkUserExists,
	checkAllEmail,
	EditProfileModel,
	getSingleUserModel,
	createAddressModel,
	editPassUserModel,
	getUserAddressModel,
	getAgreement,
} = require('../models/userModel');

const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');
const { jwtEmailGenerate } = require('../configs/generateToken');
const path = require('path');
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');

const secretKey = process.env.SECRET_KEY;

exports.registerController = async (req, res) => {
	try {
		const userInfo = req.body;
		// console.log(userInfo);
		const {
			name,
			surname,
			username,
			email,
			password,
			confirmPassword,
			phone,
			gender,
			date,
			month,
			year,
		} = userInfo;

		const isValidEmail = (email) => {
			const emailRegex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
			return emailRegex.test(email);
		};

		if (!username) {
			return res.status(400).json({ message: 'Username not empty' });
		}
		if (!email) {
			return res.status(400).json({ message: 'Email not empty' });
		}

		if (!isValidEmail(email)) {
			return res.status(400).json({ message: 'Invalid email format' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'password not matched' });
		}

		if (name === '') {
			return res.status(400).json({ message: 'First name not empty' });
		}

		if (surname === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}

		if (phone === '') {
			return res.status(400).json({
				message: 'Phone number not empty',
			});
		}
		if (gender === '') {
			return res.status(400).json({ message: 'gender not empty' });
		}
		if (!date || !month || !year) {
			return res.status(400).json({
				message: 'Date of birth not empty',
			});
		}

		const emailExists = await checkUserExists('email', email);
		if (emailExists) {
			return res.status(409).json({ message: 'Email already exists' });
		}

		const user_uuid = uuidv4();
		// console.log({...userInfo})
		const payload = await registerModel({ ...userInfo, user_uuid });

		const emailToken = jwtEmailGenerate({
			user_uuid: payload.user_uuid,
			email: payload.email,
		});

		const emailTemplatePath = path.join(__dirname, '../email/template.ejs');
		const emailTemplate = ejs.compile(
			fs.readFileSync(emailTemplatePath, 'utf-8'),
		);

		const emailContent = emailTemplate({
			emailToken,
			verifyUrl: process.env.VITE_APP_API,
		});

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			port: 587,
			secure: false,
			auth: {
				user: process.env.EMAIL_PROVIDER,
				pass: process.env.PASSWORD_PROVIDER,
			},
		});

		const mailOptions = {
			from: process.env.EMAIL_PROVIDER,
			to: 'chopper.kasidit@gmail.com',
			subject: 'Hello from sender',
			html: emailContent,
		};

		transporter.sendMail(mailOptions);

		res.status(200).json({
			message: 'Register successfully',
			emailToken,
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error',
		});
		throw err;
	}
};

exports.EditProfileController = async (req, res) => {
	try {
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user } = decoded;
		const userInfo = req.body;

		if (userInfo.name === '') {
			return res.status(400).json({ message: 'First name not empty' });
		}

		if (userInfo.surname === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}
		if (userInfo.username === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}
		if (userInfo.email === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}
		if (userInfo.phone === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}
		if (userInfo.gender === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}
		if (userInfo.date === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}
		if (userInfo.month === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}
		if (userInfo.year === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}

		await EditProfileModel(user.user_uuid, {
			...userInfo,
		});
		res.status(200).json({
			message: 'Data update successfully',
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
};

exports.getSingleUserController = async (req, res) => {
	try {
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user } = decoded;
		const payload = await getSingleUserModel(user.user_uuid);
		// console.log(result);
		if (payload) {
			res.status(200).json({ message: 'Get data successfully', payload });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Internal Server Error',
		});
	}
};

exports.getAgreementController = async (req, res) => {
	try {
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user } = decoded;
		const { is_vendor_agreement } = await getAgreement(user.user_uuid);
		// console.log(is_vendor_agreement);
		res.status(200).json({
			is_vendor_agreement,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Internal Server Error',
		});
	}
};

exports.editPassUserController = async (req, res) => {
	try {
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user } = decoded;
		const userInfo = req.body;
		if (!userInfo.password) {
			return res.status(400).json({ message: 'Enter your new password' });
		}
		await editPassUserModel({ ...user.user_uuid, ...userInfo });
		res.status(200).json({ message: 'Update Data successfully' });
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Internal Server Error',
		});
	}
};

exports.createAddressController = async (req, res) => {
	try {
		const addressInfo = req.body;
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user } = decoded;
		// console.log(user);
		const address_uuid = uuidv4();

		if (
			!addressInfo.province ||
			!addressInfo.county ||
			!addressInfo.district ||
			!addressInfo.postal_code ||
			!addressInfo.address_line_1 ||
			!addressInfo.address_label
		) {
			return res.status(400).json({
				message: 'Info is not empty',
			});
		}
		await createAddressModel({
			...addressInfo,
			address_uuid,
			user_uuid: user.user_uuid,
		});
		res.status(200).json({
			message: 'Create address successfully',
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error',
		});
	}
};

exports.getUserAddressController = async (req, res) => {
	try {
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user } = decoded;
		const payload = await getUserAddressModel(user.user_uuid);
		res.status(200).json({
			message: 'Get user address successfully',
			payload,
		});
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Internal Server Error',
		});
	}
};

exports.showData = async (req, res) => {
	const payload = req.session.user;
	const token = jwt.sign(payload, secretKey, {
		expiresIn: '1h',
	});

	try {
		if (payload) {
			res.status(200).json({ token, payload });
		} else if (err) {
			console.error('err');
			res.status(500).json({ message: err });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err });
	}
};
