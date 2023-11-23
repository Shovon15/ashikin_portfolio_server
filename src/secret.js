require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongoDB = process.env.MONGODB_ATLAS_URL;

module.exports = {
	serverPort,
	mongoDB,
};
