const multer = require("multer");
const fs = require("fs");

// Create the destination directory if it doesn't exist
const destinationDir = "public/temp";
if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (request, file, cb) {
        cb(null, destinationDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

const upload = multer({
    storage,
});

module.exports = upload;





// const multer = require("multer");

// const storage = multer.diskStorage({
// 	destination: function (request, file, cb) {
// 		cb(null, "public/temp");
// 	},

// 	//what is the file name-----------------
// 	filename: function (req, file, cb) {
// 		cb(null, Date.now() + "_" + file.originalname);
// 	},
// });

// const upload = multer({
// 	storage,
// });

// module.exports = upload;


