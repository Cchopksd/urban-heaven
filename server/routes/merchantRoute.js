const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const {
	createMerchantController,
	acceptAgreementVendorController,
} = require('../controllers/merchantController');

router.post('/create-merchant', isAuthenticated, createMerchantController);
router.patch(
	'/accept-agreement-vendor',
	isAuthenticated,
	acceptAgreementVendorController,
);

module.exports = router;
