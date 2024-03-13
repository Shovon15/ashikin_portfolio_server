const multer = require("multer");

const storage = multer.diskStorage({
	destination: function (request, file, cb) {
		cb(null, "public/temp");
	},

	//what is the file name-----------------
	filename: function (req, file, cb) {
		cb(null, Date.now() + "_" + file.originalname);
	},
});

const upload = multer({
	storage,
});

module.exports = upload;
