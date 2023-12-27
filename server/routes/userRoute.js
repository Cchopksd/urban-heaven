const express = require('express')
const { registerController,
    getAllUsersControllers,
    EditProfileController
    } = require('../controllers/userController')

const router = express.Router();

router.post('/register', registerController);
router.get('/get-all-users', getAllUsersControllers);
router.patch('/edit-profile/:user_params', EditProfileController)

module.exports = router;