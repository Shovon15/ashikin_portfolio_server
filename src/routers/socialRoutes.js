const express = require("express");
const {} = require("../controllers/bannerController");
const {
	getAllSocial,
	getSocialById,
	createSocial,
	updateSocial,
	socialDeleteByid,
} = require("../controllers/socialController");
const upload = require("../middleware/multer.middleware");

const socialRouter = express.Router();

socialRouter.get("/all", getAllSocial);
socialRouter.get("/:id", getSocialById);
socialRouter.post("/create-social", upload.single("logo"), createSocial);
socialRouter.put("/update-social/:id",upload.single("logo"), updateSocial);
socialRouter.delete("/delete-social/:id", socialDeleteByid);

module.exports = socialRouter;
