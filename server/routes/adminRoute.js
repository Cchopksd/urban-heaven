const express = require('express');
const router = express.Router();

const { accessToken } = require('../middlewares/authMiddleware');

const { getAllUsersControllers } = require('../controllers/adminController');

router.get('/get-all-users', accessToken, getAllUsersControllers);

module.exports = router;
