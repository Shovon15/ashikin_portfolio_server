const express = require("express");
const {} = require("../controllers/bannerController");
const { getLogo, createLogo, updateLogo } = require("../controllers/logoController");

const logoRouter = express.Router();

logoRouter.get("/", getLogo);
logoRouter.post("/create-logo", createLogo);
logoRouter.put("/update-logo", updateLogo);

module.exports = logoRouter;
