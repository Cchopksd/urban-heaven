const express = require('express');
const router = express.Router();

const { accessToken } = require('../middlewares/authMiddleware');
const {
	getProvinceController,
	getDistrictController,
	getSubdistrictController,
} = require('../controllers/addressController');

router.get('/province', getProvinceController);
router.get(`/province/:id/district`, getDistrictController);
router.get(`/district/:id/subdistrict`, getSubdistrictController);

module.exports = router;
