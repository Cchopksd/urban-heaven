const bcrypt = require('bcryptjs');
const { jwtDecode } = require('jwt-decode');
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
var cookie = require('cookie');

const {
	loginModel,
	updateRefreshToken,
	checkUserByTokenModel,
	checkUserByIDModel,
	getUserDataModel,
	getIsVerified,
	updateVerify,
} = require('../models/authModel');
const {
	jwtGenerate,
	jwtRefreshTokenGenerate,
	jwtEmailGenerate,
} = require('../configs/generateToken');

exports.loginController = async (req, res, next) => {
	try {
		const { email, password, isChecked } = req.body;

		if (!email) {
			return res
				.status(404)
				.json({ message: 'Enter your email address' });
		} else if (!password) {
			return res.status(404).json({ message: 'Enter your password' });
		}

		const userInfo = await loginModel(email);

		if (!userInfo) {
			return res
				.status(401)
				.json({ message: 'Invalid email or password' });
		}

		const isPasswordMatch = bcrypt.compareSync(password, userInfo.password);

		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ message: 'Invalid email or password' });
		}

		const user = {
			user_uuid: userInfo.user_uuid,
			username: userInfo.username,
			email: userInfo.email,
			role: userInfo.role,
		};

		const expireTime = isChecked ? 2592000000 : 86400000;

		const accessToken = jwtGenerate(user);

		const refreshToken = jwtRefreshTokenGenerate(user, expireTime);

		// updateRefreshToken(userInfo.user_uuid, refreshToken, isChecked);
		res.status(200).json({
			message: 'Login Successfully',
			token: { accessToken, refreshToken },
		});
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
		throw err;
	}
};

exports.refreshTokenController = async (req, res) => {
	try {
		const userInfo = await checkUserByIDModel({
			user_uuid: req.data.user.user_uuid,
		});
		const tokenInfo = await checkUserByTokenModel(
			'refresh_token',
			req.data.token,
		);
		const user = {
			user_uuid: userInfo.user_uuid,
			username: userInfo.username,
			email: userInfo.email,
			role: userInfo.role,
			isChecked: userInfo.is_checked,
		};

		if (!userInfo || tokenInfo < 0) return res.sendStatus(401);
		const expireTime = userInfo.is_checked ? 2592000000 : 86400000;

		const accessToken = jwtGenerate(user);
		const refreshToken = jwtRefreshTokenGenerate(user, expireTime);
		await updateRefreshToken(userInfo.user_uuid, refreshToken);

		res.status(200).json({
			message: 'Login Successfully',
			token: { accessToken, refreshToken },
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.getUserDataController = async (req, res) => {
	try {
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user } = decoded;
		if (!token) {
			return res.status(404).json({ error: 'Token Not Found' });
		}
		const payload = await getUserDataModel(user.user_uuid);
		res.status(200).json({ payload });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};

exports.emailValidation = async (req, res) => {
	const token = await req.headers['authorization'].replace('Bearer ', '');
	console.log('token:', req.headers['authorization']);
	const decoded = jwtDecode(token);
	const { user } = decoded;
	// console.log(user);

	const emailToken = jwtEmailGenerate({
		user_uuid: user.user_uuid,
		email: user.email,
	});

	const emailTemplatePath = path.join(__dirname, '../email/template.ejs');
	const emailTemplate = ejs.compile(
		fs.readFileSync(emailTemplatePath, 'utf-8'),
	);

	const emailContent = emailTemplate({
		emailToken,
		verifyUrl: process.env.VITE_APP_API,
	});

	try {
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
		// console.log(emailToken)
		res.status(200).send({
			message: 'Email sent successfully.',
		});
	} catch (error) {
		console.log('Error sending email:', error);
		res.status(500).json({ message: 'Error sending email' });
	}
};

exports.emailVerified = async (req, res) => {
	try {
		const token = req.params.token;
		const decoded = jwtDecode(token);
		const { user } = decoded;
		const isExpired = new Date() > new Date(decoded.exp * 1000);
		if (isExpired) {
			console.log('JWT has expired');
			return res.status(401).json({
				message: 'Unauthorized - Token has expired',
			});
		}
		console.log('JWT is still valid');
		const { is_verified } = await getIsVerified(user.user_uuid);
		console.log('status:', is_verified);
		if (is_verified) {
			return res.status(208).send({
				message: 'This email has previously been verified.',
				success: false,
			});
		}
		const result = await updateVerify(user.user_uuid);
		console.log(result);

		res.status(200).json({ message: 'Email has verified', success: true });
	} catch (err) {
		console.log('Error sending email:', err);
		res.status(500).json({ message: 'Internal Server Error' });
	}
};
