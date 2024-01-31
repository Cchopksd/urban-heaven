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
