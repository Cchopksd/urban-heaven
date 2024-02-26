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

exports.checkUserByIDModel = async (userInfo) => {
	console.log(userInfo);
	try {
		const result = await databaseConfig.query(
			`SELECT
				user_uuid,
				username,
				role
            FROM
				users
            WHERE
				user_uuid = $1
			`,
			[userInfo.user_uuid],
		);

		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.checkUserByTokenModel = async (field, value) => {
	try {
		const result = await databaseConfig.query(
			`SELECT
				COUNT(*) AS count
            FROM
				users
            WHERE
				${field} = $1
			`,
			[value],
		);
		return result.rows[0].count > 0;
		// return parseInt(result.rows[0].count) > 0;
	} catch (err) {
		throw err;
	}
};

exports.updateRefreshToken = async (user_uuid, refreshToken, isChecked) => {
	try {
		const result = await databaseConfig.query(
			`UPDATE
				users
			SET
				refresh_token = $2,
				is_checked = $3
			WHERE
				user_uuid =$1`,
			[user_uuid, refreshToken, isChecked],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.getUserDataModel = async (user_uuid) => {
	try {
		const result = await databaseConfig.query(
			`SELECT
				user_uuid,
				username,
				role
			FROM
				users
            WHERE
				user_uuid = $1 `,
			[user_uuid],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};
