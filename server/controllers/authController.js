const {
	loginModel,
	updateRefreshToken,
	checkUserByTokenModel,
	checkUserByIDModel,
	getUserDataModel,
} = require('../models/authModel');
const {
	jwtGenerate,
	jwtRefreshTokenGenerate,
} = require('../configs/generateToken');

const bcrypt = require('bcryptjs');
const { jwtDecode } = require('jwt-decode');

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

		updateRefreshToken(userInfo.user_uuid, refreshToken, isChecked);
		// req..user = user;
		// req..cookie.originalMaxAge = expireTime;
		res.status(200).json({
			accessToken,
			refreshToken,
		});
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
		throw err;
	}
};

exports.refreshTokenController = async (req, res) => {
	// console.log(req.data.user);
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

		const access_token = jwtGenerate(user);
		const refresh_token = jwtRefreshTokenGenerate(user, expireTime);
		await updateRefreshToken(
			userInfo.user_uuid,
			refresh_token,
		);

		res.status(200).json({
			access_token,
			refresh_token,
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
		const userInfo = await getUserDataModel(user.user_uuid);
		// console.log(userInfo);
		res.status(200).json({ userInfo });
	} catch (err) {
		console.error(err);
		return res.status(500).json({ error: 'Internal Server Error' });
	}
};
