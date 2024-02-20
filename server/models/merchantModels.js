const { databaseConfig } = require('../configs/connectDB');

exports.acceptAgreementVendorModel = async (vendorInfo) => {
	try {
		console.log(vendorInfo);
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

exports.createMerchant = async (merchantInfo) => {
	try {
		const result = await databaseConfig.query(
			`INSERT INTO merchant
                (
                    merchant_ID,
                    user_ID,
                    merchant_name,
                    merchant_email,
                    merchant_phone,
                    merchant_address
                )
            VALUES
                ($1, $2, $3, $4, $5, $6)
			RETURNING *`,
		);
		return result.rows[0];
	} catch (err) {
		throw err;
	}
};
