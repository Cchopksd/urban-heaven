const { getAllUsersModel } = require('../models/adminModel');

exports.getAllUsersControllers = async (req, res) => {
	try {
		const userInfo = await getAllUsersModel();
		res.status(200).json({
			message: 'Get data successfully',
			userInfo,
		});
	} catch (err) {
		res.status(500).json({
			message: 'Internal Server Error',
		});
		throw err;
	}
};
