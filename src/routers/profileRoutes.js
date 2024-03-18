const express = require("express");
const { getProfile, createProfile, updateProfile } = require("../controllers/profileController");

const profileRouter = express.Router();

profileRouter.get("/", getProfile);
profileRouter.post("/create-profile", createProfile);
profileRouter.put("/update-profile", updateProfile);

module.exports = profileRouter;
