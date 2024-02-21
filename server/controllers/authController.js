const { loginModel, getUserData } = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
		// console.log(userInfo)
		if (!userInfo) {
			return res
				.status(401)
				.json({ message: 'Invalid email or password' });
		}

		const isPasswordMatch = bcrypt.compareSync(password, userInfo.password);
		const { user_uuid, username, role } = userInfo;

		const payload = {
			user_uuid,
			username,
			email,
			role,
		};

		const header = {
			algorithm: 'HS256',
		};

		const expireSessionTime = isChecked ? 2592000000 : 86400000;

		if (!isPasswordMatch) {
			return res
				.status(401)
				.json({ message: 'Invalid email or password' });
		}

		// const token = jwt.sign(
		// 	payload,
		// 	process.env.SECRET_KEY,
		// 	header,
		// 	expireSessionTime,
		// );
		// req.headers['authorization'] = `${token}`;
		// console.log(req.headers.authorization);

		req.session.user = payload;
		// console.log(req.session.user);
		req.session.cookie.originalMaxAge = expireSessionTime;
		res.status(200).json({
			message: 'Login successfully',
		});
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
		throw err;
	}
};

exports.getAuthUserController = async (req, res) => {
	try {
		// console.log(req.session.user);
		const { user_uuid } = req.session.user;
		if (req.session.user) {
			const {is_vendor_agreement} = await getUserData({ user_uuid });
			const payload = { ...req.session.user, is_vendor_agreement };
			const config = { payload };
			res.status(200).json({ success: true, config });
		}
	} catch (err) {
		res.status(500).json({
			success: false,
			message: 'Internal Server Error' || err,
		});
	}
};

exports.logoutController = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(500).json({ message: 'Unable to logout' });
		} else {
			console.log(req.session);
			res.status(200).json({ success: true, message: 'Logout complete' });
		}
	});
};
