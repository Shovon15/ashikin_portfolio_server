const express = require("express");
const {
	createReview,
	getReviews,
	deleteReview,
	getReviewById,
	updateReviewById,
} = require("../controllers/reviewController");

const reviewRouter = express.Router();

reviewRouter.get("/all", getReviews);
reviewRouter.get("/:id", getReviewById);
reviewRouter.post("/write-review", createReview);
reviewRouter.put("/update-review/:id", updateReviewById);
reviewRouter.delete("/:id", deleteReview);

module.exports = {
	reviewRouter,
};
