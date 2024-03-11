const { Schema, model, models } = require("mongoose");

const socialSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "social Name is required"],
		},
		description: {
			type: String,
			required: [true, "description is required"],
		},
		socialLink: {
			type: String,
			required: [true, "Social link Name is required"],
		},
		logo: {
			type: String,
			required: [true, "social logo is required"],
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Social = models.social || model("social", socialSchema);

module.exports = Social;
