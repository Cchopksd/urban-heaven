const express = require('express');
const router = express.Router();
const {
	getOmiseTokenController,
	postOmiseTokenController,
} = require('../controllers/getOmiseTokenController');

router.post('/get-omise-token', getOmiseTokenController);
router.post('/post-omise-token', postOmiseTokenController);

module.exports = router;
