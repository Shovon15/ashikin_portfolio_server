const express = require("express");
const {
	createEvent,
	getEvents,
	getEventById,
	deleteEventById,
	updateEventById,
	getPublishedEvents,
	registerEvent,
	getRegisterEventByEventId,
	deleteRegisterEvent,
} = require("../controllers/eventController");
const upload = require("../middleware/uploadFile");

const eventRouter = express.Router();

eventRouter.get("/all", getEvents);
eventRouter.get("/published", getPublishedEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/write-event", createEvent);
eventRouter.put("/:id", updateEventById);
eventRouter.delete("/:id", deleteEventById);
// -------------------register events---------
eventRouter.post("/register-event", registerEvent);
eventRouter.get("/register-event/:id", getRegisterEventByEventId);
eventRouter.delete("/registered-event/:id/:eventid", deleteRegisterEvent);

module.exports = eventRouter;
