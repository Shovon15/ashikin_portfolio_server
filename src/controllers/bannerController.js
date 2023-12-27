const Banner = require("../models/bannerModel");
const createError = require("http-errors");
const { successResponse } = require("./responseController");

const updateBanner = async (req, res, next) => {
	try {
		const formData = req.body;

		const updateFields = {};

		if (formData.bannerHeader !== undefined) {
			updateFields.bannerHeader = formData.bannerHeader;
		}

		if (formData.bannerText !== undefined) {
			updateFields.bannerText = formData.bannerText;
		}

		if (formData.backgroundImage !== undefined) {
			updateFields.backgroundImage = formData.backgroundImage;
		}
		if (formData.portfolioImage !== undefined) {
			updateFields.portfolioImage = formData.portfolioImage;
		}

		const updatedBanner = await Banner.findOneAndUpdate({}, { $set: updateFields }, { new: true });

		if (!updatedBanner) {
			throw createError(404, "Banner not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Banner updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const getBanner = async (req, res, next) => {
	try {
		const { bannerHeader, bannerText, backgroundImage, portfolioImage } = await Banner.findOne();

		return successResponse(res, {
			statusCode: 200,
			message: "banner return successfully!",
			payload: {
				data: {
					bannerHeader,
					bannerText,
					backgroundImage,
					portfolioImage,
				},
			},
		});
	} catch (error) {
		next(error);
	}
};
const createBanner = async (req, res, next) => {
	try {
		const { bannerHeader, bannerText, backgroundImage, portfolioImage } = req.body;

		await Banner.deleteMany();

		if (bannerHeader || bannerText || backgroundImage || portfolioImage) {
			await Banner.create({
				bannerHeader,
				bannerText,
				backgroundImage,
				portfolioImage,
			});
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Banner successfully created",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getBanner, createBanner, updateBanner };
