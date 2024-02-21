const {
	merchantModel,
	acceptAgreementVendorModel,
} = require('../models/merchantModels');

exports.acceptAgreementVendorController = async (req, res) => {
	try {
		const { is_vendor_agreement } = req.body;
		console.log(is_vendor_agreement);
		const { user_uuid } = req.session.user;
		if (is_vendor_agreement) {
			await acceptAgreementVendorModel({
				user_uuid,
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
