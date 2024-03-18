const omise = require('omise')({
	publicKey: process.env.OMISE_PUBLIC_KEY,
});

exports.getOmiseTokenController = async (req, res) => {
	const source = {
		type: 'promptpay',
		amount: 500000, // Amount in satangs (THB)
		currency: 'thb',
	};
	try {
		const token = await omise.sources.create(source);
		console.log(token);
		res.status(200).json(token);
	} catch (error) {
		console.error(error);
		res.status(500).json({
			error: error.code,
		});
	}
};