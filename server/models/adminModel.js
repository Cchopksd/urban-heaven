const { databaseConfig } = require('../configs/connectDB');

exports.getAllUsersModel = async () => {
	try {
		const result = await databaseConfig.query(`
        SELECT
            *
        FROM
            users
        `);
        // ORDER BY
        //     user_id DESC
		return result.rows;
	} catch (err) {
		throw err;
	}
};
