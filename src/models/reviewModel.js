const { model, models, Schema } = require("mongoose");

const reviewSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		designation: {
			type: String,
			required: [true, "designation is required"],
		},
		cover: {
			type: String,
			required: [true, "image is required"],
		},
		reviewText: {
			type: String,
			required: [true, "review comment is required"],
		},
	},
	{
		timestamps: true,
	}
);

const Review = models.reviews || model("reviews", reviewSchema);
module.exports = Review;
