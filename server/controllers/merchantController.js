const {
	acceptAgreementVendorModel,
	createMerchantModel,
	checkShopExists,
} = require('../models/merchantModels');

const { jwtDecode } = require('jwt-decode');
const cloudinary = require('../configs/cloudinary');

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
		const requestInfo = req.body;
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user_uuid } = decoded.user;
		const nameRegex = /^[a-zA-Z]+(?:\s[a-zA-Z]+)?$/;
		const id_card = req.files['id_card'];
		const person_image = req.files['person_image'];
		var keyCount = Object.keys(requestInfo).length;

		if (!requestInfo.shop_name) {
			return res.status(400).json({ message: 'Name is not empty' });
		}

		if (!nameRegex.test(requestInfo.shop_name)) {
			res.status(400).json({ message: 'Invalid name format' });
		}

		const shopExists = await checkShopExists(requestInfo.shop_name);

		if (shopExists) {
			return res
				.status(409)
				.json({ message: 'This name is already used', success: false });
		}

		if (!requestInfo.contact_email) {
			return res.status(400).json({ message: 'Email is not empty' });
		}

		if (!requestInfo.contact_phone) {
			return res.status(400).json({ message: 'Phone is not empty' });
		}

		if (!requestInfo.description) {
			return res
				.status(400)
				.json({ message: 'Description is not empty' });
		}

		if (!requestInfo.id_number) {
			return res
				.status(400)
				.json({ message: 'Personal ID is not empty' });
		}

		if (!id_card) {
			return res
				.status(400)
				.json({ message: 'Please upload your ID Card' });
		}

		if (!person_image) {
			return res.status(400).json({
				message: 'Please upload you paired with ID card',
			});
		}

		const fileFields = ['id_card', 'person_image'];
		const uploadedFiles = {};

		await Promise.all(
			fileFields.map(async (field) => {
				const files = req.files[field];
				uploadedFiles[field] = files[0];
			}),
		);

		const cloudResults = await Promise.all(
			Object.entries(uploadedFiles).map(async ([fieldName, file]) => {
				const fileBase64 = file.buffer.toString('base64');
				const fileURI = `data:${file.mimetype};base64,${fileBase64}`;

				const cloudResponse = await cloudinary.uploader.upload(
					fileURI,
					{
						resource_type: 'auto',
						folder: 'Shop Require',
					},
				);
				return { [fieldName]: cloudResponse.url };
			}),
		);

		const cloudResult = Object.assign({}, ...cloudResults);

		createMerchantModel({
			...requestInfo,
			user_uuid,
			...cloudResult,
		});

		res.status(200).json({
			message: 'Registration Successful',
			success: true,
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error' || err.message,
		});
		console.log(err);
	}
};
