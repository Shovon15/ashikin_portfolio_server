const { Schema, model, models } = require("mongoose");

const socialSupportSchema = new Schema(
	{
		title: {
			type: String,
			requier: [true, "social support title is required"],
		},
		description: {
			type: String,
			requier: [true, "social support description is required"],
		},
		image: {
			type: String,
			requier: [true, "image  is required"],
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);
const SocialSupport = models.socialsupport || model("socialsupport", socialSupportSchema);

module.exports = SocialSupport;
