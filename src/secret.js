require("dotenv").config();

const serverPort = process.env.SERVER_PORT || 5001;
const mongoDB = process.env.MONGODB_ATLAS_URL;
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY;

module.exports = {
	serverPort,
	mongoDB,
	jwtActivationKey,
};
