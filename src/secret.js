require("dotenv").config({ path: ".env" });

const serverPort = process.env.SERVER_PORT || 5001;
const mongoDB = process.env.MONGODB_URI;
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY;
//secret
module.exports = {
	serverPort,
	mongoDB,
	jwtActivationKey,
};
