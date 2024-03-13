const express = require("express");
const {} = require("../controllers/bannerController");
const { createBrand, getBrand, deleteBrand } = require("../controllers/brandController");

const brandRouter = express.Router();

brandRouter.get("/all", getBrand);
brandRouter.post("/create-brand",  createBrand);
brandRouter.delete("/delete-brand/:id", deleteBrand);

module.exports = brandRouter;
