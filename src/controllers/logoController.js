const createError = require("http-errors");
const { successResponse } = require("./responseController");
const Logo = require("../models/logoModel");
const { uploadOnCloudinary } = require("../helper/cloudinary");

const updateLogo = async (req, res, next) => {
	try {
		const { logo } = req.body;

		if (!logo) {
			throw createError(400, "logo file is required");
		}

		const updateFields = {};

		updateFields.logoImage = logo;

		const updatedLogo = await Logo.findOneAndUpdate({}, { $set: updateFields }, { new: true });

		return successResponse(res, {
			statusCode: 200,
			message: "Logo updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const getLogo = async (req, res, next) => {
	try {
		const data = await Logo.findOne({});

		if (!data) {
			throw createError(404, "logo image not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "logo return successfully!",
			payload: {
				data: {
					logoImage: data.logoImage,
				},
			},
		});
	} catch (error) {
		next(error);
	}
};
const createLogo = async (req, res, next) => {
	try {
		const { logo } = req.body;

		if (!logo) {
			throw createError(400, "logo file is required");
		}

		if (logo) {
			await Logo.deleteMany();

			await Logo.create({
				logoImage: logo,
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Logo successfully created",
			payload: {
				logo,
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getLogo, createLogo, updateLogo };
