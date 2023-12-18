const Event = require("../models/eventModel");
const fs = require("fs");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const findeWithId = require("../services/findWithId");
const { deleteImage } = require("../helper/deleteImage");

const createEvent = async (req, res, next) => {
	try {
		const { title, eventType, cover, cover_deleteUrl, dateTime, content } = req.body;

		await Event.create({
			title,
			eventType,
			cover,
			cover_deleteUrl,
			dateTime,
			content,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Event Created Successfully.",
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
			message: "Get Event  Successfully!!!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getEventById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const options = {};

		const data = await findeWithId(Event, id, options);

		return successResponse(res, {
			statusCode: 200,
			message: "event were return successfully!!!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};

const deleteEventById = async (req, res, next) => {
	try {
		const id = req.params.id;

		const event = await findeWithId(Event, id);

		await Event.findByIdAndDelete({
			_id: id,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Event was deleted successfully.",
		});
	} catch (error) {
		next(error);
	}
};

const updateEventById = async (req, res, next) => {
	try {
		const eventId = req.params.id;
		const formData = req.body;

		const existingEvent = await findeWithId(Event, eventId);

		if (!existingEvent) {
			throw createError(404, "Event not found");
		}

		const updateFields = {};

		if (formData.isPublished !== undefined) {
			const publishedEventCount = await Event.countDocuments({
				eventType: formData.eventType,
				isPublished: true,
			});

			const maxPublishedEvents = 3;

			if (formData.isPublished && publishedEventCount >= maxPublishedEvents) {
				throw createError(400, `Maximum ${maxPublishedEvents} ${formData.eventType} events already published.`);
			}

			updateFields.isPublished = formData.isPublished;
		}

		if (formData.cover !== undefined) {
			updateFields.cover = formData.cover;
		}

		if (formData.title !== undefined) {
			updateFields.title = formData.title;
		}

		if (formData.eventType !== undefined) {
			updateFields.eventType = formData.eventType;
		}

		if (formData.dateTime !== undefined) {
			updateFields.dateTime = formData.dateTime;
		}

		if (formData.content !== undefined) {
			updateFields.content = formData.content;
		}

		await Event.findByIdAndUpdate(eventId, { $set: updateFields }, { new: true });

		return successResponse(res, {
			statusCode: 200,
			message: "Event was updated successfully!!!",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createEvent,
	getEvents,
	getEventById,
	updateEventById,
	deleteEventById,
};
