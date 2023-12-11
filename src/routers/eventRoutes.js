const express = require("express");
const {
	createEvent,
	getEvents,
	getEventById,
	deleteEventById,
	updateEventById,
	publishedId,
} = require("../controllers/eventController");
const upload = require("../middleware/uploadFile");

const eventRouter = express.Router();

eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/write-event",createEvent);
eventRouter.put("/:id", updateEventById);
// eventRouter.put("/:id", publishedId);
eventRouter.delete("/:id", deleteEventById);

module.exports = eventRouter;
