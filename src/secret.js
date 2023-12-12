require("dotenv").config({ path: ".env" });

const serverPort = process.env.SERVER_PORT || 5001;
const mongoDB =
	process.env.MONGODB_URI ||
	"mongodb+srv://vercel-admin-user:ukMrxM8dTUrppEWc@cluster0.o5a9jb9.mongodb.net/myFirstDatabase?";
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY;
//secret
module.exports = {
	serverPort,
	mongoDB,
	jwtActivationKey,
};
