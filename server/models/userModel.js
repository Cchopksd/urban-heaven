const { databaseConfig } = require('../configs/connectDB');
const bcrypt = require('bcrypt');

exports.registerModel = async (userInfo) => {
    try {
        const hashedPassword = await bcrypt.hash(userInfo.user_password, 10);
        await databaseConfig.query(
            `INSERT INTO users (user_id, user_fname, user_lname, username, user_email, user_password)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [userInfo.userId, userInfo.user_fname, userInfo.user_lname, userInfo.username, userInfo.user_email, hashedPassword]
        );
    } catch (err) {
        throw err;
    }
};

exports.loginModel = async (user_email) => {
    try {
        const result = await databaseConfig.query(
            `SELECT * FROM users
            WHERE user_email = $1 `,
            [user_email]
        )
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}


exports.checkUserExists = async (field, value) => {
    try {
        const result = await databaseConfig.query(
            `SELECT COUNT(*) AS count
            FROM users
            WHERE ${field} = $1`, [value]
        );

        return parseInt(result.rows[0].count) > 0;
    } catch (err) {
        throw err;
    }
};