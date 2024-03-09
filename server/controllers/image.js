const cloudinary = require('../configs/cloudinary');

exports.sendImage = async (req, res) => {
	try {
		console.log(req.file);
		if (!req.file) {
			return res.status(400).json({ message: 'No file uploaded' });
		}

		const b64 = Buffer.from(req.file.buffer).toString('base64');
		let imgURI = 'data:' + req.file.mimetype + ';base64,' + b64;

		const cldRes = await cloudinary.uploader.upload(imgURI, {
			resource_type: 'auto',
		});
		console.log(cldRes);
		res.json(cldRes);
	} catch (error) {
		console.log(error);
		res.send({
			message: error.message,
		});
	}
};
