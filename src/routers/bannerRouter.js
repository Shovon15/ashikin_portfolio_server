const express = require("express");
const { getBanner, createBanner, updateBanner } = require("../controllers/bannerController");

const bannerRouter = express.Router();

bannerRouter.get("/", getBanner);
bannerRouter.post("/create-banner", createBanner);
bannerRouter.put("/update-banner", updateBanner);

module.exports = bannerRouter;
