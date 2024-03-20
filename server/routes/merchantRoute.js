const express = require('express');
const router = express.Router();
const Multer = require('multer');

const { accessToken } = require('../middlewares/authMiddleware');
const {
	createMerchantController,
	acceptAgreementVendorController,
	shopCheckRequestController,
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
	'/request-shop',
	upload.fields([
		{ name: 'id_card', maxCount: 1 },
		{ name: 'person_image', maxCount: 1 },
	]),
	createMerchantController,
);

router.get('/is-request-shop', shopCheckRequestController);

module.exports = router;
