const express = require('express');
const router = express.Router();

const { accessToken } = require('../middlewares/authMiddleware');
const {
	createMerchantController,
	acceptAgreementVendorController,
} = require('../controllers/merchantController');

router.post('/create-merchant', accessToken, createMerchantController);
router.patch(
	'/accept-agreement-vendor',
	accessToken,
	acceptAgreementVendorController,
);

module.exports = router;
