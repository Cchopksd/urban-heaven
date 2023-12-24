const express = require('express')
const { registerController,
    loginController,
    logoutController } = require('../controllers/userController')
const { isAuthenticated } = require('../middlewares/authMiddleware')

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.post('/logout', isAuthenticated, logoutController);

module.exports = router;