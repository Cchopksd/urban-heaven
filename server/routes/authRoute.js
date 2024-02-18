const express = require('express');
const router = express.Router();
const {
	loginController,
	getAuthUserController,
	logoutController,
} = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/login', loginController);
router.get('/get-auth-user', isAuthenticated, getAuthUserController);
router.post('/logout', isAuthenticated, logoutController);

module.exports = router;
