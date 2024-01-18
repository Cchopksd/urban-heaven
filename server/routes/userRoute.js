const express = require('express');
const {
	registerController,
	getAllUsersControllers,
	EditProfileController,
	createAddressController,
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerController);
router.get('/get-all-users', getAllUsersControllers);
router.patch(
	'/edit-profile/:user_params',
	EditProfileController,
);
router.post(
	'/create-address/:user_params',
	createAddressController,
);

module.exports = router;
