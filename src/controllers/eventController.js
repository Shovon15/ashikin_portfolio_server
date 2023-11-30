const Event = require("../models/eventModel");
const fs = require("fs");
const { successResponse } = require("./responseController");
const findeWithId = require("../services/findWithId");

const createEvent = async (req, res, next) => {
	try {
		const { title, content, dateTime } = req.body;
		const { originalname, path } = req.file;

		await Event.create({
			title,
			content,
			dateTime,
			cover: path,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "event created successfully!!!",
			payload: {
				title,
				content,
				dateTime,
				cover: path,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getEvents = async (req, res, next) => {
	try {
		const data = await Event.find();
		return successResponse(res, {
			statusCode: 200,
			message: "get event  successfully!!!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};

// ------------------delete user by id------------------------
const getEventById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const options = {};

		const event = await findeWithId(Event, id, options);

		return successResponse(res, {
			statusCode: 200,
			message: "event were return successfully!!!",
			payload: {
				event,
			},
		});
	} catch (error) {
		next(error);
	}
};
module.exports = {
	createEvent,
	getEvents,
	getEventById,
};
