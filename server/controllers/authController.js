const { loginModel } = require('../models/authModel');
const bcrypt = require('bcrypt');

exports.loginController = async (req, res, next) => {
	try {
		// console.log(req.body)
		const { user_email, user_password, isChecked } = req.body;

		if (!user_email) {
			return res
				.status(404)
				.json({ message: 'Enter your email address' });
		} else if (!user_password) {
			return res.status(404).json({ message: 'Enter your password' });
		}

		const userInfo = await loginModel(user_email);
		// console.log(userInfo)
		if (userInfo) {
			const isPasswordMatch = await bcrypt.compareSync(
				user_password,
				userInfo.user_password,
			);
			const { user_id, username } = userInfo;
			const payload = {
				user_id,
				username,
				user_email,
			};

			const expireSessionTime = isChecked ? 2592000000 : 86400000;

			if (isPasswordMatch) {
				req.session.user = payload;
				req.session.cookie.originalMaxAge = expireSessionTime;
				res.status(200).json({ message: 'Login success', user_email });
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
			res.status(500).json({ message: 'Internal server error' });
		} else {
			console.log(req.session);
			res.status(200).json({ success: true, message: 'Logout complete' });
		}
	});
};
