const {
	getProvinceModel,
	getDistrictModel,
    getSubdistrictModel,
} = require('../models/addressModel');

exports.getProvinceController = async (req, res) => {
	try {
		const payload = await getProvinceModel();
		res.status(200).json({
			message: 'Get data successfully',
			payload,
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error',
		});
		return err;
	}
};

exports.getDistrictController = async (req, res) => {
	try {
        const { id } = req.params;
		const payload = await getDistrictModel(id);
		res.status(200).json({
			message: 'Get data successfully',
			payload,
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error',
		});
		return err;
	}
};

exports.getSubdistrictController = async (req, res) => {
	try {
		const { id } = req.params;
		const payload = await getSubdistrictModel(id);
		res.status(200).json({
			message: 'Get data successfully',
			payload,
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error',
		});
		return err;
	}
};
