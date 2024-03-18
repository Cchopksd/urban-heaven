const omise = require('omise')({
	publicKey: process.env.OMISE_PUBLIC_KEY,
	secretKey: process.env.OMISE_SECRET_KEY,
});

exports.getOmiseTokenController = async (req, res) => {
	const { card_name, card_number, exp_month, exp_year, security_code } =
		req.body;
	try {
		const token = await omise.tokens.create({
			card: {
				currency: 'THB',
				city: 'Bangkok',
				country:'TH',
				amount: 400000,
				name: card_name,
				number: card_number,
				expiration_month: exp_month,
				expiration_year: exp_year,
				security_code: security_code,
			},
		});
		const retrievedToken = await omise.tokens.retrieve(token.id);

		// Check if the token has been used
		if (retrievedToken.used) {
			return res.status(403).json({
				message: 'Forbidden: Token has already been used.',
			});
		}
		res.status(200).json({ token: retrievedToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: error.code,
		});
	}
};

exports.postOmiseTokenController = async (req, res) => {
	const { email, name, amount, token } = req.body;
	try {
		const customer = await omise.customers.create({
			email,
			description: name,
			card: token,
		});
		console.log(customer);

		const charge = await omise.charges.create({
			amount: amount,
			currency: 'thb',
			customer: customer.id,
		});

		res.send({
			amount: charge.amount,
			status: charge.status,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: error.code,
		});
	}
};
