const { databaseConfig } = require('../configs/connectDB');

exports.loginModel = async (user_email) => {
	try {
		const result = await databaseConfig.query(
			`SELECT * FROM users
            WHERE email = $1 `,
			[user_email],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};


exports.getUserData = async (userInfo) => {
	try {
		const result = await databaseConfig.query(
			`SELECT
				is_vendor_agreement
			FROM
				agreement
            WHERE user_uuid = $1 `,
			[userInfo.user_uuid],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
}