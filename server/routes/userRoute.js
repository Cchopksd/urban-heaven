const express = require('express');
const {
	registerController,
	getAllUsersControllers,
	EditProfileController,
	createAddressController,
	showData,
	getSingleUserController,
	editPassUserController,
	getUserAddressController,
} = require('../controllers/userController');

const { isAuthenticated } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', registerController);
router.get('/get-all-users', getAllUsersControllers);
router.get('/get-single-user', isAuthenticated, getSingleUserController);
router.get('/pull-user-data', isAuthenticated, showData);
router.get('/get-user-address', isAuthenticated, getUserAddressController);
router.patch(
	'/edit-profile',
	isAuthenticated,
	EditProfileController,
);
router.patch('/edit-pass', isAuthenticated, editPassUserController);
router.post('/create-address', createAddressController);

module.exports = router;
