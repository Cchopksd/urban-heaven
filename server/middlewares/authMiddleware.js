const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');

exports.accessToken = async (req, res, next) => {
	try {
		const token = req.headers['authorization'].replace('Bearer ', '');

		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
			if (err) {
				return res.status(401).json({ message: 'Unauthorized' });
			}
			next();
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.verifyRefreshToken = async (req, res, next) => {
	try {
		const token = req.headers['authorization'].replace('Bearer ', '');
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
			if (err) {
				return res.status(401).json({ message: 'Unauthorized' });
			}
			req.data = decoded; // เก็บข้อมูลผู้ใช้ใน req.user เพื่อให้ module ถัดไปใช้
			req.data.token = token;
			delete req.data.exp;
			delete req.data.iat;

			next();
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};

exports.isAdmin = async (req, res, next) => {
	try {
		const token = req.headers['authorization'].replace('Bearer ', '');
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const decoded = jwtDecode(token);
		const { role } = decoded.user;
		if (role !== 'admin') {
			return res
				.status(403)
				.json({
					message: 'Access to this resource on the server is denied!',
				});
		}
		next();
	} catch (error) {
		console.error(error);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
};
