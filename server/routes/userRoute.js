const Multer = require('multer');
const express = require('express');
const router = express.Router();

const {
	registerController,
	EditProfileController,
	createAddressController,
	showData,
	getSingleUserController,
	editPassUserController,
	getUserAddressController,
	getAgreementController,
} = require('../controllers/userController');

const { accessToken } = require('../middlewares/authMiddleware');

const store = new Multer.memoryStorage()
const upload = Multer({
	store,
});

router.post('/register', upload.single('avatar'), registerController);
router.get('/get-single-user', accessToken, getSingleUserController);
router.get('/get-user-agreement', accessToken, getAgreementController);
router.get('/pull-user-data', accessToken, showData);
router.get('/get-user-address', accessToken, getUserAddressController);
router.patch('/edit-profile', accessToken, EditProfileController);
router.patch('/edit-pass', accessToken, editPassUserController);
router.post('/create-address', createAddressController);

module.exports = router;
