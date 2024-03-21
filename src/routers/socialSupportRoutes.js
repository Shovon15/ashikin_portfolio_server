const express = require("express");
const {
	getSocialSupportById,
	getSocialSupport,
	createSocialSupport,
	updateSocailSupport,
	deleteSocialSupport,
} = require("../controllers/socialSupportController");

const socialSupportRoute = express.Router();

socialSupportRoute.get("/all", getSocialSupport);
socialSupportRoute.get("/:_id", getSocialSupportById);
socialSupportRoute.post("/create-social-support", createSocialSupport);
socialSupportRoute.put("/update-social-support/:_id", updateSocailSupport);
socialSupportRoute.delete("/:_id", deleteSocialSupport);

module.exports = socialSupportRoute;
