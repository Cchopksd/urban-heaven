const express = require('express');
const router = express.Router();

const {
	isAuthenticated,
	isAdminAuthenticated,
} = require('../middlewares/authMiddleware');

const { getAllUsersControllers } = require('../controllers/adminController');

router.get(
	'/get-all-users',
	isAuthenticated,
	isAdminAuthenticated,
	getAllUsersControllers,
);

module.exports = router;
