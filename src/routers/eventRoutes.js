const express = require("express");
const {
	createEvent,
	getEvents,
	deleteEventBySlug,
	updateEventBySlug,
	getPublishedEvents,
	registerEvent,
	getRegisterEventByEventSlug,
	deleteRegisterEvent,
	getEventBySlug,
} = require("../controllers/eventController");

const eventRouter = express.Router();

eventRouter.get("/all", getEvents);
eventRouter.get("/published", getPublishedEvents);
eventRouter.post("/write-event", createEvent);
eventRouter.put("/:slug", updateEventBySlug);
eventRouter.delete("/:slug", deleteEventBySlug);
eventRouter.get("/:slug", getEventBySlug);
// -------------------register events---------
eventRouter.post("/register-event", registerEvent);
eventRouter.get("/register-event/:slug", getRegisterEventByEventSlug);
eventRouter.delete("/registered-event/:id/:eventslug", deleteRegisterEvent);

module.exports = eventRouter;
