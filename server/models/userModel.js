const { databaseConfig } = require('../configs/connectDB');
const bcrypt = require('bcrypt');

exports.registerModel = async (userInfo) => {
    console.log(userInfo)
    try {
        const hashedPassword = await bcrypt.hash(userInfo.password, 10);
        await databaseConfig.query(
            `INSERT INTO users (user_id, user_fname, user_lname, username, user_email, user_password)
            VALUES ($1, $2, $3, $4, $5, $6)`,
            [userInfo.userID, userInfo.name, userInfo.surname, userInfo.username, userInfo.email, hashedPassword]
        );
    } catch (err) {
        throw err;
    }
};

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

exports.getAllUsersModel = async () => {
    try {
        const result = await databaseConfig.query(
            `SELECT * FROM users`
        )
        return result.rows;
    } catch (err) {
        throw err;
    }
}

exports.EditProfileModel = async (user_params, userInfo) => {
    console.log(user_params)
    try {
        const hashedPassword = await bcrypt.hash(userInfo.user_password, 10);
        const result = await databaseConfig.query(
            `Update users
            SET user_fname = $1, user_lname= $2, username= $3, user_email= $4, user_password= $5
            WHERE user_id= $6
            RETURNING user_id, user_fname, user_lname,username, user_email, user_password`
            ,
            [userInfo.user_fname, userInfo.user_lname, userInfo.username, userInfo.user_email, hashedPassword, user_params]
        )
        return result.rows[0];
    } catch (err) {
        throw err;
    }
}

exports.getSingleUserModel = async (userInfo) => {

}