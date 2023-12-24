const express = require("express");
const {
	createService,
	getServices,
	getServiceByid,
	updateServiceById,
	getServiceDeleteByid,
	getPublishedServices,
} = require("../controllers/serviceController");

const serviceRouter = express.Router();

serviceRouter.get("/all", getServices);
serviceRouter.get("/published", getPublishedServices);
serviceRouter.get("/:id", getServiceByid);
serviceRouter.post("/write-service", createService);
serviceRouter.put("/update-service/:id", updateServiceById);
serviceRouter.delete("/:id", getServiceDeleteByid);

module.exports = serviceRouter;
