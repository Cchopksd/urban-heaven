const { databaseConfig } = require('../configs/connectDB');
const bcrypt = require('bcryptjs');

exports.registerModel = async (userInfo) => {
	console.log(userInfo);
	try {
		const hashedPassword = await bcrypt.hash(userInfo.password, 10);
		const result = await databaseConfig.query(
			`INSERT INTO users (uuid, first_name, last_name, username, email, password, phone, gender, date, month, year)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
			RETURNING user_id`,

			[
				userInfo.userID,
				userInfo.name,
				userInfo.surname,
				userInfo.username,
				userInfo.email,
				hashedPassword,
				userInfo.phone,
				userInfo.gender,
				userInfo.date,
				userInfo.month,
				userInfo.year,
			],
		);
		return result.rows[0].user_id;
	} catch (err) {
		throw err;
	}
};

exports.checkUserExists = async (field, value) => {
	try {
		const result = await databaseConfig.query(
			`SELECT COUNT(*) AS count
            FROM users
            WHERE ${field} = $1`,
			[value],
		);

		return parseInt(result.rows[0].count) > 0;
	} catch (err) {
		throw err;
	}
};

exports.getAllUsersModel = async () => {
	try {
		const result = await databaseConfig.query(`SELECT * FROM users`);
		return result.rows;
	} catch (err) {
		throw err;
	}
};

exports.EditProfileModel = async (params, userInfo) => {
	console.log(params);
	try {
		const hashedPassword = await bcrypt.hash(userInfo.password, 10);
		await databaseConfig.query(
			`UPDATE users
            SET fname = $1, lname= $2, username= $3, email= $4, password= $5
            WHERE id= $6
            RETURNING id, fname, lname,username, email, password`,
			[
				userInfo.fname,
				userInfo.lname,
				userInfo.username,
				userInfo.email,
				hashedPassword,
				params,
			],
		);
	} catch (err) {
		throw err;
	}
};

exports.getSingleUserModel = async (userInfo) => {
	try {
		const result = await databaseConfig.query(
			`SELECT uuid, first_name, last_name, phone, gender, date, month, year
			FROM users
			WHERE uuid=$1`,
			[userInfo.uuid],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.editPassUserModel = async (userInfo) => {
	const hashedPassword = await bcrypt.hash(userInfo.password, 10);
	try {
		const result = await databaseConfig.query(
			`UPDATE users
			SET password=$1
			WHERE uuid=$2
			RETURNING *`,
			[hashedPassword, userInfo.uuid],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.createAddressModel = async (address) => {
	console.log(address);
	try {
		const result = await databaseConfig.query(
			`
			INSERT INTO address (address_ID, user_id, province, county, district, post_ID, address_etc, address_default, address_label)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8,$9)
			RETURNING *`,
			[
				address.addressID,
				address.uuid,
				address.province,
				address.county,
				address.district,
				address.post_ID,
				address.address_etc,
				address.address_default,
				address.address_label,
			],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.getUserAddressModel = async (uuid) => {
	try {
		const result = await databaseConfig.query(
			`SELECT address.address_id, address.province, address.county, address.district, address.post_id, address.address_etc, address.address_default, address.address_label
			FROM address
			RIGHT JOIN users ON address.user_id = users.uuid
			WHERE users.uuid = $1`,
			[uuid],
		);
		return result.rows[0];
	} catch {
		throw err;
	}
};
