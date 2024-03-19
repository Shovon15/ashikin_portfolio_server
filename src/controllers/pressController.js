const createError = require("http-errors");
const { successResponse } = require("./responseController");
const { uploadOnCloudinary } = require("../helper/cloudinary");
const findWithId = require("../services/findWithId");
const Press = require("../models/pressModel");

const updatePress = async (req, res, next) => {
	try {
		const formData = req.body;
		const { _id } = req.params;

		const updateFields = {};

		if (formData.heading !== undefined) {
			updateFields.heading = formData.heading;
		}

		if (formData.description !== undefined) {
			updateFields.description = formData.description;
		}

		if (formData.buttonText !== undefined) {
			updateFields.buttonText = formData.buttonText;
		}

		if (formData.link !== undefined) {
			updateFields.link = formData.link;
		}

		if (formData.image !== undefined && formData.image !== null) {
			updateFields.image = formData.image;
		}

		if (formData.isPublished !== undefined) {
			updateFields.isPublished = formData.isPublished;
		}

		const updatedLogo = await Press.findOneAndUpdate({ _id }, { $set: updateFields }, { new: true });

		if (!updatedLogo) {
			throw createError(404, "press data not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Press updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const getPress = async (req, res, next) => {
	try {
		const data = await Press.find();

		if (!data) {
			throw createError(404, "press data not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "press data return successfully!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};
const getPressById = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const data = await Press.findById(_id);

		if (!data) {
			throw createError(404, "press data not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "press data return successfully!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};
const deletePress = async (req, res, next) => {
	try {
		const id = req.params._id;

		const data = await findWithId(Press, id);

		if (!data) {
			throw createError(404, "press data not found.");
		}

		await Press.findByIdAndDelete(id);

		return successResponse(res, {
			statusCode: 200,
			message: "press data deleted successfully!",
		});
	} catch (error) {
		next(error);
	}
};
const createPress = async (req, res, next) => {
	try {
		const { heading, description, buttonText, link, image } = req.body;

		if (!(heading || description || buttonText || link || image)) {
			throw createError(400, "all field is required");
		}

		await Press.create({
			heading,
			description,
			buttonText,
			link,
			image,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "press successfully created",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getPress, createPress, getPressById, updatePress, deletePress };
