const createError = require("http-errors");
const { successResponse } = require("./responseController");
const Brand = require("../models/brandModel");
const { uploadOnCloudinary } = require("../helper/cloudinary");
const findWithId = require("../services/findWithId");

// const updateLogo = async (req, res, next) => {
// 	try {
// 		const formData = req.body;

// 		const updateFields = {};

// 		if (formData.logoImage !== undefined) {
// 			updateFields.logoImage = formData.logoImage;
// 		}

// 		// if (formData.bannerText !== undefined) {
// 		// 	updateFields.bannerText = formData.bannerText;
// 		// }

// 		// if (formData.backgroundImage !== undefined) {
// 		// 	updateFields.backgroundImage = formData.backgroundImage;
// 		// }
// 		// if (formData.portfolioImage !== undefined) {
// 		// 	updateFields.portfolioImage = formData.portfolioImage;
// 		// }

// 		const updatedLogo = await Logo.findOneAndUpdate({}, { $set: updateFields }, { new: true });

// 		if (!updatedLogo) {
// 			throw createError(404, "Logo image not found.");
// 		}

// 		return successResponse(res, {
// 			statusCode: 200,
// 			message: "Logo updated successfully!",
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

const getBrand = async (req, res, next) => {
	try {
		const data = await Brand.find();

		if (!data) {
			throw createError(404, "brand image not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "brand return successfully!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};
const deleteBrand = async (req, res, next) => {
	try {
		const id = req.params.id;

		const brandData = await findWithId(Brand, id);

		if (!brandData) {
			throw createError(404, "brand data not found.");
		}

		await Brand.findByIdAndDelete(id);

		return successResponse(res, {
			statusCode: 200,
			message: "brand deleted successfully!",
		});
	} catch (error) {
		next(error);
	}
};
const createBrand = async (req, res, next) => {
	try {
		const { brand } = req.body;

		if (!brand) {
			throw createError(400, "brand logo file is required");
		}

		await Brand.create({
			brandLogo: brand,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "brand successfully created",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getBrand, createBrand, deleteBrand };
