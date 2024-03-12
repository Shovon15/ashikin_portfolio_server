const createError = require("http-errors");
const { successResponse } = require("./responseController");
const Logo = require("../models/logoModel");

const updateLogo = async (req, res, next) => {
	try {
		const formData = req.body;

		const updateFields = {};

		if (formData.logoImage !== undefined) {
			updateFields.logoImage = formData.logoImage;
		}

		const updatedLogo = await Logo.findOneAndUpdate({}, { $set: updateFields }, { new: true });

		if (!updatedLogo) {
			throw createError(404, "Logo image not found.");
		}

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
		const { logoImage } = req.body;

		if (!logoImage) {
			throw createError(404, "logo image not found.");
		}

		await Logo.deleteMany();

		if (logoImage) {
			await Logo.create({
				logoImage,
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Logo successfully created",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getLogo, createLogo, updateLogo };
