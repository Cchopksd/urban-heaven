const {
	merchantModel,
	acceptAgreementVendorModel,
} = require('../models/merchantModels');

const { jwtDecode } = require('jwt-decode');

exports.acceptAgreementVendorController = async (req, res) => {
	try {
		const { is_vendor_agreement } = req.body;
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user } = decoded;
		if (is_vendor_agreement) {
			await acceptAgreementVendorModel({
				user_uuid: user.user_uuid,
				is_vendor_agreement,
			});

			res.status(200).json({
				message: 'User Accept Agreement',
			});
		}
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error' || err.message,
		});
		console.log(err);
	}
};

exports.createMerchantController = async (req, res) => {
	try {
	} catch (err) {}
};
