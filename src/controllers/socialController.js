const Banner = require("../models/bannerModel");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const Logo = require("../models/logoModel");
const Social = require("../models/socialModel");
const { uploadOnCloudinary } = require("../helper/cloudinary");
const findWithId = require("../services/findWithId");

const updateSocial = async (req, res, next) => {
	try {
		const { id } = req.params;
		const formData = req.body;

		const ExistingSocialData = await findWithId(Social, id);

		if (!ExistingSocialData) {
			throw createError(404, "Social data not found");
		}

		const updateFields = {};

		if (formData.name !== undefined) {
			updateFields.name = formData.name;
		}

		if (formData.description !== undefined) {
			updateFields.description = formData.description;
		}

		if (formData.socialLink !== undefined) {
			updateFields.socialLink = formData.socialLink;
		}

		if (formData.isPublished !== undefined) {
			updateFields.isPublished = !ExistingSocialData.isPublished;
		}
		if (formData.logo !== undefined) {
			updateFields.logo = formData.logo;
		}

		// if (req.file?.path) {
		// 	const logoLocalPath = req.file.path;

		// 	if (!logoLocalPath) {
		// 		throw createError(400, "social logo file is required");
		// 	}

		// 	const logo = await uploadOnCloudinary(logoLocalPath, 150, 50);

		// 	if (!logo) {
		// 		throw createError(400, "error while upload image");
		// 	}

		// 	updateFields.logo = logo.url;
		// }

		const updatedSocial = await Social.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

		if (!updatedSocial) {
			throw createError(404, "social link not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "social link updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const getAllSocial = async (req, res, next) => {
	try {
		const data = await Social.find();

		if (!data) {
			throw createError(404, "logo image not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "social return successfully!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};

const getSocialById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const social = await findWithId(Social, id);

		return successResponse(res, {
			statusCode: 200,
			message: "social data return Successfully.",
			payload: {
				data: social,
			},
		});
	} catch (error) {
		next(error);
	}
};

const createSocial = async (req, res, next) => {
	try {
		const { name, description, socialLink, logo } = req.body;

		if (!(name || description || socialLink || logo)) {
			throw createError(404, "all field is required.");
		}

		await Social.create({
			name,
			description,
			socialLink,
			logo,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "social link successfully created",
		});
	} catch (error) {
		next(error);
	}
};

const socialDeleteByid = async (req, res, next) => {
	try {
		const id = req.params.id;

		const social = await findWithId(Social, id);

		if (!social) {
			throw createError(404, "social link data not found.");
		}

		await Social.findByIdAndDelete(id);

		return successResponse(res, {
			statusCode: 200,
			message: "social link data was deleted successfully.",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getAllSocial, createSocial, getSocialById, updateSocial, socialDeleteByid };
