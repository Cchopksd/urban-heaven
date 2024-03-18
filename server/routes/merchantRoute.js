const express = require('express');
const router = express.Router();
const Multer = require('multer');

const { accessToken } = require('../middlewares/authMiddleware');
const {
	createMerchantController,
	acceptAgreementVendorController,
} = require('../controllers/merchantController');

const store = new Multer.memoryStorage();
// const upload = Multer({ dest: 'uploads/' });  //Store on server file
const upload = Multer({ store }); //Store on cloud

router.patch(
	'/accept-agreement-vendor',
	accessToken,
	acceptAgreementVendorController,
);
router.post(
	'/create-shop',
	upload.fields([
		{ name: 'shop_name' },
		{ name: 'contact_email' },
		{ name: 'contact_phone' },
		{ name: 'description' },
		{ name: 'promptpay' },
		{ name: 'cash' },
		{ name: 'google_pay' },
		{ name: 'credit_card' },
		{ name: 'id_number' },
		{ name: 'id_card', maxCount: 1 },
		{ name: 'person_image', maxCount: 1 },
	]),
	createMerchantController,
);

module.exports = router;
