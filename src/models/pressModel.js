const { Schema, model, models } = require("mongoose");

const pressSchema = new Schema(
	{
		heading: {
			type: String,
			requier: [true, "press heading is required"],
		},
		description: {
			type: String,
			requier: [true, "press text is required"],
		},
		image: {
			type: String,
			requier: [true, "image  is required"],
		},
		buttonText: {
			type: String,
			requier: [true, "button text  is required"],
		},
		link: {
			type: String,
			requier: [true, "link  is required"],
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
const Press = models.press || model("press", pressSchema);

module.exports = Press;
