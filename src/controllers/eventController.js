const Event = require("../models/eventModel");
const fs = require("fs");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const findWithId = require("../services/findWithId");
const { deleteImage } = require("../helper/deleteImage");
const Registration = require("../models/registrationModel");

const createEvent = async (req, res, next) => {
	try {
		const { title, eventType, cover, cover_deleteUrl, dateTime, content } = req.body;

		if (title || eventType || cover || cover_deleteUrl || dateTime || content) {
			await Event.create({
				title,
				eventType,
				cover,
				cover_deleteUrl,
				dateTime,
				content,
			});
		}

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

const getPublishedEvents = async (req, res, next) => {
	try {
		const data = await Event.find({ isPublished: true });

		if (data.length === 0) {
			return successResponse(res, {
				statusCode: 200,
				message: "No Published Event found",
				payload: { data },
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Get Published Event Successfully",
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

		const data = await findWithId(Event, id, options);

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

		const event = await findWithId(Event, id);

		if (!event) {
			throw createError(404, "Event not found.");
		}

		await Event.findByIdAndDelete(id);

		await Registration.deleteMany({ eventId: id });

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

		const existingEvent = await findWithId(Event, eventId);

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
			message: "Event was updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const registerEvent = async (req, res, next) => {
	try {
		const { firstName, lastName, whatsapp, phone, email, instituteName, accountNumber, eventId, eventTitle } =
			req.body;
		// const eventData = await findWithId(Event, eventId);
		if (
			firstName ||
			lastName ||
			whatsapp ||
			phone ||
			email ||
			instituteName ||
			accountNumber ||
			eventId ||
			eventTitle
		) {
			const eventInstance = await Registration.create({
				firstName,
				lastName,
				whatsapp,
				phone,
				email,
				instituteName,
				accountNumber,
				eventId,
				eventTitle,
			});
			await Event.updateOne({ _id: eventId }, { $inc: { register: 1 } });
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Event Registered Successfully.",
			payload: {},
		});
	} catch (error) {
		next(error);
	}
};

const getRegisterEventByEventId = async (req, res, next) => {
	try {
		const { id } = req.params;

		const eventData = await Event.find({ _id: id });
		const registeredEvent = await Registration.find({ eventId: id });

		return successResponse(res, {
			statusCode: 200,
			message: "get Registered Event by Events Successfully.",

			payload: {
				registeredEvent,
				eventData,
			},
		});
	} catch (error) {
		next(error);
	}
};

const deleteRegisterEvent = async (req, res, next) => {
	try {
		const { id, eventid } = req.params;

		const registeredEvent = await Registration.find({ _id: id });

		if (!registeredEvent) {
			//
			throw createError(404, "Registered event not found");
		}

		await Registration.findByIdAndDelete(id);

		await Event.updateOne({ _id: eventid }, { $inc: { register: -1 } });

		return successResponse(res, {
			statusCode: 200,
			message: "Events Registration delete Successfully.",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createEvent,
	getEvents,
	getPublishedEvents,
	getEventById,
	updateEventById,
	deleteEventById,
	registerEvent,
	getRegisterEventByEventId,
	deleteRegisterEvent,
};
