const { databaseConfig } = require('../configs/connectDB');
const bcrypt = require('bcryptjs');

exports.registerModel = async (userInfo) => {
	console.log(userInfo.avatar_image);
	try {
		const hashedPassword = await bcrypt.hash(userInfo.password, 10);
		const result = await databaseConfig.query(
			`INSERT INTO users
			(
				first_name,
				last_name,
				username,
				email,
				password,
				phone,
				gender,
				date,
				month,
				year,
				avatar_image
			)
            VALUES (
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9,
				$10,
				COALESCE($11, 'https://res.cloudinary.com/du2ue2bj0/image/upload/v1709218418/Profile/errf9tyzzdpuruls2dmj.png')
			)
			RETURNING *`,

			[
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
				userInfo.avatar_image,
			],
		);
		await databaseConfig.query(
			`INSERT INTO agreement
				( user_uuid )
			VALUES ( $1 )
			RETURNING *`,
			[result.rows[0].user_uuid],
		);
		return {
			user_uuid: result.rows[0].user_uuid,
			email: result.rows[0].email,
			is_checked: result.rows[0].is_checked,
		};
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
		const result = await databaseConfig.query(
			`UPDATE
				users
            SET
				first_name = COALESCE(NULLIF($2, '')::VARCHAR, first_name),
				last_name = COALESCE(NULLIF($3, '')::VARCHAR, last_name),
				phone = COALESCE(NULLIF($4, '')::VARCHAR, phone),
				gender = COALESCE(NULLIF($5, '')::VARCHAR, gender),
				date = COALESCE(NULLIF($6, '')::INTEGER, date),
				month = COALESCE(NULLIF($7, '')::INTEGER, month),
				year = COALESCE(NULLIF($8, '')::INTEGER, year),
				avatar_image = COALESCE(NULLIF($9, '')::VARCHAR, avatar_image)
            WHERE
				user_uuid = $1
            RETURNING *`,
			[
				user_uuid,
				userInfo.first_name,
				userInfo.last_name,
				userInfo.phone,
				userInfo.gender,
				userInfo.date,
				userInfo.month,
				userInfo.year,
				userInfo.avatar_image,
			],
		);
		return result.rows[0];
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
				year,
				avatar_image
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
