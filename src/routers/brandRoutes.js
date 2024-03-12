const express = require("express");
const {} = require("../controllers/bannerController");
const upload = require("../middleware/multer.middleware");
const { createBrand, getBrand, deleteBrand } = require("../controllers/brandController");

const brandRouter = express.Router();

brandRouter.get("/all", getBrand);
brandRouter.post("/create-brand", upload.single("brand"), createBrand);
brandRouter.delete("/delete-brand/:id", deleteBrand);

module.exports = brandRouter;
