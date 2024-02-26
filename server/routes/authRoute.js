const express = require('express');
const router = express.Router();
const {
	loginController,
	refreshTokenController,
	getUserDataController,
	emailValidation,
} = require('../controllers/authController');
const {
	accessToken,
	verifyRefreshToken,
} = require('../middlewares/authMiddleware');

router.post('/login', loginController);
router.post('/auth/refresh-token', verifyRefreshToken, refreshTokenController);
router.get('/auth/get-auth-data', accessToken, getUserDataController);
router.post('/verify-email', emailValidation);
module.exports = router;
