require("dotenv").config({ path: ".env" });

const serverPort = process.env.SERVER_PORT || 5001;
const mongoDB = process.env.MONGODB_URI;
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY;
const smtpUserName = process.env.SMTP_USERNAME;
const smtpPassword = process.env.SMTP_PASSWORD;
const clientUrl = process.env.CLIENT_URL;

const cloudName = process.env.CLOUD_NAME;
const cloudApiKey = process.env.CLOUD_API_KEY;
const cloudApiSecret = process.env.CLOUD_API_SECRET;

module.exports = {
	serverPort,
	mongoDB,
	jwtActivationKey,
	smtpUserName,
	smtpPassword,
	clientUrl,
	cloudName,
	cloudApiKey,
	cloudApiSecret,
};
