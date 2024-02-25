const express = require('express');
const router = express.Router();
const {
	loginController,
	refreshTokenController,
	getUserDataController,
} = require('../controllers/authController');
const {
	accessToken,
	verifyRefreshToken,
} = require('../middlewares/authMiddleware');

router.post('/login', loginController);
router.post('/auth/refresh-token', verifyRefreshToken, refreshTokenController);
router.get('/auth/get-auth-data', accessToken, getUserDataController);

module.exports = router;
