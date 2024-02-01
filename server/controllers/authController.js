const { loginModel } = require('../models/authModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

exports.loginController = async (req, res, next) => {
	try {
		// console.log(req.body)
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
		if (userInfo) {
			const isPasswordMatch = await bcrypt.compareSync(
				password,
				userInfo.password,
			);
			const { uuid, username } = userInfo;
			const payload = {
				uuid,
				username,
				email,
			};

			const expireSessionTime = isChecked ? 2592000000 : 86400000;

			if (isPasswordMatch) {
				req.session.user = payload;
				req.session.cookie.originalMaxAge = expireSessionTime;
				const token = jwt.sign(payload, secretKey, {
					expiresIn: '1h',
				});
				const config = { payload, token };
				res.status(200).json({
					message: 'Login success',
					config,
				});
				// return res.redirect(303, `${process.env.VITE_APP_API}/account/edit-profile`);
			} else {
				return res
					.status(401)
					.json({ message: 'Invalid email or password' });
			}
		} else {
			return res
				.status(401)
				.json({ message: 'Invalid email or password' });
		}
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
		throw err;
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
