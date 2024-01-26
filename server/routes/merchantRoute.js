const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middlewares/authMiddleware');
const {
	createMerchantController,
} = require('../controllers/merchantController');

router.post('/create-merchant', isAuthenticated, createMerchantController);

module.exports = router;
