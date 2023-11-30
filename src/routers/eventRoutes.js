const express = require("express");
const { createEvent, getEvents, getEventById } = require("../controllers/eventController");
const upload = require("../middleware/uploadFile");
const multer = require("multer");

const eventRouter = express.Router();

const uploadMiddleware = multer({ dest: "public/images" });

// userRouter.get("/:id", getUserById);
eventRouter.get("/", getEvents);
eventRouter.get("/:id", getEventById);
eventRouter.post("/write-event", upload.single("file"), createEvent);
// eventRouter.post("/write-event", uploadMiddleware.single("file"), createEvent);
// eventRouter.post("/write-event", createEvent);

module.exports = eventRouter;
