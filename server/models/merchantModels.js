const { databaseConfig } = require('../configs/connectDB');

exports.acceptAgreementVendorModel = async (vendorInfo) => {
	try {
		const result = await databaseConfig.query(
			`UPDATE agreement
            SET
                is_vendor_agreement = $1,
                user_uuid = $2
            WHERE user_uuid= $2
            `,
			[vendorInfo.is_vendor_agreement, vendorInfo.user_uuid],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.createMerchantModel = async (requestInfo) => {
	console.log(requestInfo);
	try {
		const result = await databaseConfig.query(
			`INSERT INTO shop_request_form
                (
                    user_uuid,
                    shop_name,
                    contact_email,
                    contact_phone,
                    description,
					promptpay,
					cash,
					google_pay,
					card,
					id_number,
					id_card,
					person_image
                )
            VALUES
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 )
			RETURNING *`,
			[
				requestInfo.user_uuid,
				requestInfo.shop_name,
				requestInfo.contact_email,
				requestInfo.contact_phone,
				requestInfo.description,
				requestInfo.promptpay,
				requestInfo.cash,
				requestInfo.google_pay,
				requestInfo.credit_card,
				requestInfo.id_number,
				requestInfo.id_card,
				requestInfo.person_image,
			],
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};

exports.checkShopExists = async (value) => {
	try {
		const result = await databaseConfig.query(
			`
			SELECT COUNT(*) AS count
			FROM shop
			WHERE name = $1
			`,
			[value],
		);
		return parseInt(result.rows[0].count) > 0;
	} catch (err) {
		throw err;
	}
};
