const { databaseConfig } = require('../configs/connectDB');
const bcrypt = require('bcryptjs');

exports.registerModel = async (userInfo) => {
	// console.log(userInfo);
	try {
		const hashedPassword = await bcrypt.hash(userInfo.password, 10);
		const result = await databaseConfig.query(
			`INSERT INTO users
			(
				user_uuid,
				first_name,
				last_name, username,
				email, password,
				phone, gender,
				date, month,
				year
			)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
			RETURNING *`,

			[
				userInfo.user_uuid,
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
		const resultAgreement = await databaseConfig.query(
			`INSERT INTO agreement
				( user_uuid )
			VALUES ( $1 )
			RETURNING *`,
			[result.rows[0].user_uuid],
		);
		return resultAgreement.rows[0].user_uuid;
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

exports.EditProfileModel = async (user_uuid, userInfo) => {
	try {
		await databaseConfig.query(
			`UPDATE
				users
            SET
				first_name = $2,
				last_name= $3,
				username = $4,
				email= $5,
				phone = $6,
				gender= $7,
				date = $8,
				month= $9,
				year= $10
            WHERE
				user_uuid = $1
            RETURNING *`,
			[
				user_uuid,
				userInfo.name,
				userInfo.surname,
				userInfo.username,
				userInfo.email,
				userInfo.phone,
				userInfo.gender,
				userInfo.date,
				userInfo.month,
				userInfo.year,
			],
		);
	} catch (err) {
		throw err;
	}
};

exports.getSingleUserModel = async (user_uuid) => {
	try {
		const result = await databaseConfig.query(
			`SELECT
				user_uuid,
				first_name,
				last_name,
				phone, gender,
				date,
				month,
				year
			FROM
				users
			WHERE
				user_uuid = $1
			`,
			[user_uuid],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.getAgreement = async (user_uuid) => {
	try {
		const result = await databaseConfig.query(
			`SELECT
				agreement.user_uuid ,
				agreement.is_vendor_agreement
			FROM
				users
			RIGHT JOIN
				agreement ON users.user_uuid = agreement.user_uuid
			WHERE
				agreement.user_uuid = $1
			`,
			[user_uuid],
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
			WHERE user_uuid=$2
			RETURNING *`,
			[hashedPassword, userInfo.user_uuid],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.createAddressModel = async (address) => {
	console.log(address);
	try {
		const resultAddress = await databaseConfig.query(
			`
            INSERT INTO address (address_uuid, province, county, district, postal_code, address_line_1, address_line_2, address_default, address_label)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING *`,
			[
				address.address_uuid,
				address.province,
				address.county,
				address.district,
				address.postal_code,
				address.address_line_1,
				address.address_line_2,
				address.address_default,
				address.address_label,
			],
		);

		// Insert into 'user_addresses' table
		const resultUserAddress = await databaseConfig.query(
			`
            INSERT INTO user_addresses (address_uuid, user_uuid)
            VALUES ($1, $2)
            RETURNING *`,
			[resultAddress.rows[0].address_uuid, address.user_uuid],
		);

		return resultUserAddress.rows[0];
	} catch (err) {
		console.error('Error creating address:', err);
		throw err;
	}
};

exports.getUserAddressModel = async (user_uuid) => {
	try {
		const result = await databaseConfig.query(
			`SELECT
				address.address_uuid,
				address.province,
				address.county,
				address.district,
				address.postal_code,
				address.address_line_1,
				address.address_line_2,
				address.address_label,
				address.address_default
			FROM
				address
			RIGHT JOIN
				user_addresses ON address.address_uuid = user_addresses.address_uuid
			RIGHT JOIN
				users ON user_addresses.user_uuid = users.user_uuid
			WHERE
				users.user_uuid = $1`,
			[user_uuid],
		);
		return result.rows;
	} catch {
		throw err;
	}
};
