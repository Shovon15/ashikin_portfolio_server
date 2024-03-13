const express = require("express");
const {} = require("../controllers/bannerController");
const {
	getAllSocial,
	getSocialById,
	createSocial,
	updateSocial,
	socialDeleteByid,
} = require("../controllers/socialController");

const socialRouter = express.Router();

socialRouter.get("/all", getAllSocial);
socialRouter.get("/:id", getSocialById);
socialRouter.post("/create-social", createSocial);
socialRouter.put("/update-social/:id", updateSocial);
socialRouter.delete("/delete-social/:id", socialDeleteByid);

module.exports = socialRouter;
