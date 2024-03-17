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

		if (formData.imageList !== undefined) {
			updateFields.imageList = formData.imageList;
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
		const data = await Banner.find();

		return successResponse(res, {
			statusCode: 200,
			message: "banner return successfully!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};
const createBanner = async (req, res, next) => {
	try {
		const { bannerHeader, bannerText, imageList } = req.body;

		await Banner.deleteMany();

		if (!(bannerHeader || bannerText || imageList)) {
			throw createError(404, "All Field is required.");
		}
		await Banner.create({
			bannerHeader,
			bannerText,
			imageList,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Banner successfully created",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getBanner, createBanner, updateBanner };