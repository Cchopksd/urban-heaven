const express = require('express');
const {
	registerController,
	getAllUsersControllers,
	EditProfileController,
	createAddressController,
	showData,
	getSingleUserController,
	editPassUserController,
} = require('../controllers/userController');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerController);
router.get('/get-all-users', getAllUsersControllers);
router.get('/get-single-user', isAuthenticated, getSingleUserController);
router.get('/pull-user-data', isAuthenticated, showData);
router.patch(
	'/edit-profile/:user_params',
	isAuthenticated,
	EditProfileController,
);
router.patch('/edit-pass', isAuthenticated, editPassUserController);
router.post('/create-address/:user_params', createAddressController);

module.exports = router;
