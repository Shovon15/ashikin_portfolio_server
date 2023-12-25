const createError = require("http-errors");
const { successResponse } = require("./responseController");
const Service = require("../models/serviceModel");
const findWithId = require("../services/findWithId");

const getServices = async (req, res, next) => {
	try {
		const services = await Service.find();

		return successResponse(res, {
			statusCode: 200,
			message: "Service return Successfully.",
			payload: {
				data: services,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getPublishedServices = async (req, res, next) => {
	try {
		const data = await Service.find({ isPublished: true });

		if (data.length === 0) {
			return successResponse(res, {
				statusCode: 200,
				message: "No Published Service found",
				payload: {
					data,
				},
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

const getServiceByid = async (req, res, next) => {
	try {
		const { id } = req.params;
		const service = await findWithId(Service, id);

		return successResponse(res, {
			statusCode: 200,
			message: "Service return Successfully.",
			payload: {
				data: service,
			},
		});
	} catch (error) {
		next(error);
	}
};

const createService = async (req, res, next) => {
	try {
		const { heading, title, cover, description } = req.body;

		if (heading || title || cover || description) {
			await Service.create({
				heading,
				title,
				cover,
				description,
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Service Created Successfully.",
		});
	} catch (error) {
		next(error);
	}
};

const updateServiceById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const formData = req.body;

		const Services = await findWithId(Service, id);

		if (!Services) {
			throw createError(404, "Event not found");
		}

		const updateFields = {};

		if (formData.isPublished !== undefined) {
			updateFields.isPublished = !Services.isPublished;
		}

		if (formData.heading !== undefined) {
			updateFields.heading = formData.heading;
		}

		if (formData.title !== undefined) {
			updateFields.title = formData.title;
		}

		if (formData.cover !== undefined) {
			updateFields.cover = formData.cover;
		}

		if (formData.description !== undefined) {
			updateFields.description = formData.description;
		}

		await Service.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

		return successResponse(res, {
			statusCode: 200,
			message: "Service updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const getServiceDeleteByid = async (req, res, next) => {
	try {
		const id = req.params.id;

		const service = await findWithId(Service, id);

		if (!service) {
			throw createError(404, "Service not found.");
		}

		await Service.findByIdAndDelete(id);

		return successResponse(res, {
			statusCode: 200,
			message: "Service was deleted successfully.",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getServices,
	getPublishedServices,
	getServiceByid,
	createService,
	updateServiceById,
	getServiceDeleteByid,
};
