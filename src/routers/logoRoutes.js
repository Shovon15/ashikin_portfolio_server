const express = require("express");
const {} = require("../controllers/bannerController");
const { getLogo, createLogo, updateLogo } = require("../controllers/logoController");
const upload = require("../middleware/multer.middleware");

const logoRouter = express.Router();

logoRouter.get("/", getLogo);
logoRouter.post("/create-logo", upload.single("logo"), createLogo);
logoRouter.put("/update-logo", upload.single("logo"), updateLogo);

module.exports = logoRouter;
