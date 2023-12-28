const Review = require("../models/reviewModel");
const findWithId = require("../services/findWithId");
const { successResponse } = require("./responseController");

const getReviews = async (req, res, next) => {
	try {
		const reviews = await Review.find();

		return successResponse(res, {
			statusCode: 200,
			message: "Review Return Successfully.",
			payload: {
				data: reviews,
			},
		});
	} catch (error) {
		next(error);
	}
};
const getReviewById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const reviews = await findWithId(Review, id);

		if (!reviews) {
			throw createError(404, "Review not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Review Return Successfully.",
			payload: {
				data: reviews,
			},
		});
	} catch (error) {
		next(error);
	}
};
const createReview = async (req, res, next) => {
	try {
		const { name, designation, cover, reviewText } = req.body;

		if (name || designation || cover || reviewText) {
			await Review.create({
				name,
				designation,
				cover,
				reviewText,
			});
		}
		return successResponse(res, {
			statusCode: 200,
			message: "Review Created Successfully.",
		});
	} catch (error) {
		next(error);
	}
};
const updateReviewById = async (req, res, next) => {
	try {
		const { id } = req.params;
		const formData = req.body;

		const review = await findWithId(Review, id);

		if (!review) {
			throw createError(404, "Review not found");
		}

		const updateFields = {};

		if (formData.name !== undefined) {
			updateFields.name = formData.name;
		}

		if (formData.designation !== undefined) {
			updateFields.designation = formData.designation;
		}

		if (formData.cover !== undefined) {
			updateFields.cover = formData.cover;
		}

		if (formData.reviewText !== undefined) {
			updateFields.reviewText = formData.reviewText;
		}

		await Review.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

		return successResponse(res, {
			statusCode: 200,
			message: "Review updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const deleteReview = async (req, res, next) => {
	try {
		const { id } = req.params;
		const reviews = await findWithId(Review, id);

		if (!reviews) {
			throw createError(404, "Review not found.");
		}

		await Review.findByIdAndDelete(id);

		return successResponse(res, {
			statusCode: 200,
			message: "Review was Deleted Successfully.",
		});
	} catch (error) {
		next(error);
	}
};
module.exports = {
	getReviews,
	getReviewById,
	createReview,
	updateReviewById,
	deleteReview,
};
