const { databaseConfig } = require('../configs/connectDB');

const createMerchant = async(merchantInfo) => {
    try {
        const result = await databaseConfig.query(
			`INSERT INTO merchant (merchant_ID, user_ID, merchant_name, merchant_email, merchant_phone, merchant_address)
            VALUES ($1, $2, $3, $4, $5, $6)
			RETURNING *`,
        );
        return result.rows[0]
	} catch (err) {
		throw err;
	}
};
