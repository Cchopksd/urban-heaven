const Multer = require('multer');
const express = require('express');
const router = express.Router();

const { sendImage } = require('../controllers/image');

const storage = new Multer.memoryStorage();
const upload = Multer({
	storage: storage,
});

router.post('/send-image', upload.single('avatar'), sendImage);

module.exports = router;
