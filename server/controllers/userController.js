const {
	registerModel,
	checkUserExists,
	checkAllEmail,
	getAllUsersModel,
	EditProfileModel,
	getSingleUserModel,
	createAddressModel,
} = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

exports.registerController = async (req, res) => {
	try {
		const userInfo = req.body;
		console.log(userInfo);
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

		const userID = uuidv4();
		// console.log({...userInfo})
		await registerModel({ ...userInfo, userID });
		res.status(200).json({
			message: 'Register successfully',
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
		const { user_params } = req.params;
		const userInfo = req.body;

		if (userInfo.fname === '') {
			return res.status(400).json({ message: 'First name not empty' });
		}

		if (userInfo.lname === '') {
			return res.status(400).json({ message: 'Last name not empty' });
		}

		await EditProfileModel(user_params, {
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

exports.getAllUsersControllers = async (req, res) => {
	try {
		const userInfo = await getAllUsersModel();
		res.status(200).json({
			message: 'Get data successfully',
			userInfo,
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error',
		});
		throw err;
	}
};

exports.getSingleUserController = async (req, res) => {
	try {
		const { uuid } = req.session.user;

		// console.log(uuid);
		const result = await getSingleUserModel({ uuid });
		// console.log(result);
		if (result) {
			// const token = jwt.sign(result, secretKey, { expiresIn: '1h' });
			res.status(200).json({ message: 'Get data successfully', result });
		} else {
			res.status(404).json({ message: 'User not found' });
		}
	} catch (err) {
		res.status(500).json({
			message: err.message || 'Internal Server Error',
		});
	}
};

exports.createAddressController = async (req, res) => {
	try {
		const addressInfo = req.body;
		const { user_params } = req.params;
		const addressID = uuidv4();

		if (
			!addressInfo.province ||
			!addressInfo.county ||
			!addressInfo.district ||
			!addressInfo.post_ID ||
			!addressInfo.address_etc ||
			!addressInfo.address_label
		) {
			return res.status(400).json({
				message: 'Information is not empty',
			});
		}
		await createAddressModel({
			...addressInfo,
			addressID,
			user_params,
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

exports.showData = async (req, res) => {
	const payload = req.session.user;
	const token = jwt.sign(payload, secretKey, {
		expiresIn: '1h',
	});

	try {
		if (payload) {
			res.status(200).json({ token,payload });
		} else if (err) {
			console.error('err');
			res.status(500).json({ message: err });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: err });
	}
};
