const Event = require("../models/eventModel");
const fs = require("fs");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const findWithId = require("../services/findWithId");
const { deleteImage } = require("../helper/deleteImage");
const Registration = require("../models/registrationModel");
const findWithSlug = require("../services/findWithSlug");

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
			message: "program Created Successfully.",
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
			message: "Get program  Successfully!!!",
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
				message: "No Published program found",
				payload: { data },
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Get Published program Successfully",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getEventBySlug = async (req, res, next) => {
	try {
		const { slug } = req.params;

		const data = await findWithSlug(Event, slug);

		return successResponse(res, {
			statusCode: 200,
			message: "program were return successfully!!!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};

const deleteEventBySlug = async (req, res, next) => {
	try {
		const { slug } = req.params;

		const event = await findWithSlug(Event, slug);

		if (!event) {
			throw createError(404, "Event not found.");
		}

		await Event.findOneAndDelete(slug);

		await Registration.deleteMany({ eventSlug: slug });

		return successResponse(res, {
			statusCode: 200,
			message: "program deleted successfully.",
		});
	} catch (error) {
		next(error);
	}
};

const updateEventBySlug = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const formData = req.body;

		const existingEvent = await findWithSlug(Event, slug);

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

		const updatedEvent = await Event.findOneAndUpdate({ slug }, { $set: updateFields }, { new: true });
		return successResponse(res, {
			statusCode: 200,
			message: "program updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const registerEvent = async (req, res, next) => {
	try {
		const { firstName, lastName, whatsapp, phone, email, instituteName, accountNumber, eventSlug, eventTitle } =
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
			eventSlug ||
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
				eventSlug,
				eventTitle,
			});
			await Event.updateOne({ slug: eventSlug }, { $inc: { register: 1 } });
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Program Registered Successfully.",
		});
	} catch (error) {
		next(error);
	}
};

const getRegisterEventByEventSlug = async (req, res, next) => {
	try {
		const { slug } = req.params;

		const eventData = await Event.find({ slug: slug });
		const registeredEvent = await Registration.find({ eventSlug: slug });

		return successResponse(res, {
			statusCode: 200,
			message: "get Registered program Successfully.",

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
		const { id, eventslug } = req.params;

		const registeredEvent = await findWithId(Registration, id);

		if (!registeredEvent) {
			//
			throw createError(404, "Registered event not found");
		}

		await Registration.findByIdAndDelete(id);

		await Event.updateOne({ slug: eventslug }, { $inc: { register: -1 } });

		return successResponse(res, {
			statusCode: 200,
			message: "program Registration delete Successfully.",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createEvent,
	getEvents,
	getPublishedEvents,
	getEventBySlug,
	updateEventBySlug,
	deleteEventBySlug,
	registerEvent,
	getRegisterEventByEventSlug,
	deleteRegisterEvent,
};
