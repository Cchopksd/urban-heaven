const express = require('express');
const router = express.Router();
const {
	loginController,
	refreshTokenController,
	getUserDataController,
	emailValidation,
	emailVerified,
} = require('../controllers/authController');
const {
	accessToken,
	verifyRefreshToken,
} = require('../middlewares/authMiddleware');

router.post('/login', loginController);
router.post('/auth/refresh-token', verifyRefreshToken, refreshTokenController);
router.get('/auth/get-auth-data', accessToken, getUserDataController);
router.post('/email-validation', emailValidation);
router.post('/verify-email/:token', emailVerified);
module.exports = router;
