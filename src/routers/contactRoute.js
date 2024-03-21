const express = require("express");
const {
	getContact,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
} = require("../controllers/contactController");

const contactRoute = express.Router();

contactRoute.get("/all", getContact);
contactRoute.get("/:_id", getContactById);
contactRoute.post("/", createContact);
contactRoute.put("/:_id", updateContact);
contactRoute.delete("/:_id", deleteContact);

module.exports = contactRoute;
