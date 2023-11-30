const express = require("express");
const { seedUser } = require("../controllers/seedController");

const seedRouter = express.Router();

seedRouter.get("/admin", seedUser);

module.exports = seedRouter;
