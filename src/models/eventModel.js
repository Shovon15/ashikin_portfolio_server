const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
		},
		content: {
			type: String,
			required: [true, "text content is required"],
		},
		dateTime: {
			type: String,
			required: [true, "date and time is required"],
		},
		cover: {
			type: String,
			required: [true, "cover image is required"],
		},
	},
	{
		timestamps: true,
	}
);
const Event = model("event", eventSchema);

module.exports = Event;
