const jwt = require('jsonwebtoken');

exports.jwtGenerate = (user) => {
	return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: '30m',
		algorithm: 'HS256',
	});
};

exports.jwtRefreshTokenGenerate = (user, expireTime) => {
	return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: expireTime,
		algorithm: 'HS256',
	});
};
