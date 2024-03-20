const {
	acceptAgreementVendorModel,
	createMerchantModel,
	checkShopNameExists,
	checkShopRequestExists,
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
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		const id_card = req.files['id_card'];
		const person_image = req.files['person_image'];
		var keyCount = Object.keys(requestInfo).length;
		if (!requestInfo.shop_name) {
			return res.status(400).json({ message: 'Name is not empty' });
		}

		if (!nameRegex.test(requestInfo.shop_name)) {
			res.status(400).json({ message: 'Invalid name format' });
		}

		const shopExists = await checkShopNameExists(requestInfo.shop_name);

		if (shopExists) {
			return res
				.status(409)
				.json({ message: 'This name is already used', success: false });
		}

		if (!requestInfo.shop_email) {
			return res.status(400).json({ message: 'Email is not empty' });
		}

		if (!emailRegex.test(requestInfo.shop_email)) {
			res.status(400).json({ message: 'Invalid email format' });
		}

		if (!requestInfo.shop_tel) {
			return res.status(400).json({ message: 'Phone is not empty' });
		}

		if (!requestInfo.description) {
			return res
				.status(400)
				.json({ message: 'Description is not empty' });
		}

		if (!requestInfo.personal_id) {
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

		//Pronise เป็นฟังก์ชันที่จะรอ item ที่อยู่ใน promise มีการคืนต่าออกมาทั้งหทด
		await Promise.all(
			//map object => array
			fileFields.map(async (field) => {
				const files = req.files[field];
				uploadedFiles[field] = files[0];
			}),
		);

		const cloudResults = await Promise.all(
			//Object.entries() เพื่อดึงค่าและคีย์จาก Object แล้วใช้ map() เพื่อทำการ loop
			//จะแปลง uploadedFiles เป็น array คู่คีย์และค่าที่แต่ละคู่ป็น array
			Object.entries(uploadedFiles).map(async ([fieldName, file]) => {
				const fileBase64 = file.buffer.toString('base64');
				const fileURI = `data:${file.mimetype};base64,${fileBase64}`;

				const cloudResponse = await cloudinary.uploader.upload(
					fileURI,
					{
						resource_type: 'auto',
						folder: 'Shop Request',
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
			message:
				'Requirement form been sent to admin please wait for 3-7 days',
			success: true,
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error' || err.message,
		});
		console.log(err);
	}
};

exports.shopCheckRequestController = async (req, res) => {
	try {
		const token = await req.headers['authorization'].replace('Bearer ', '');
		const decoded = jwtDecode(token);
		const { user_uuid } = decoded.user;
		const result = await checkShopRequestExists(user_uuid);
		res.status(200).json({ message: result });
	} catch (err) {
		res.status(500).json({ message: err });
	}
};
