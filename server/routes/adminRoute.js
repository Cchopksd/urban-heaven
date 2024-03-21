const express = require('express');
const router = express.Router();

const { accessToken, isAdmin } = require('../middlewares/authMiddleware');

const { getAllUsersControllers } = require('../controllers/adminController');

router.get('/get-all-users', accessToken, isAdmin, getAllUsersControllers);



module.exports = router;
