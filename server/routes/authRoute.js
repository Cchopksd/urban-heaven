const express = require('express');
const router = express.Router();
const { loginController,
    logoutController } = require('../controllers/authController');
const { isAuthenticated } = require('../middlewares/authMiddleware')

router.post('/login', loginController);
router.post('/logout', logoutController);

module.exports = router;