const { models } = require("mongoose");
const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
		},
		eventType: {
			type: String,
			required: [true, "Event type is required"],
		},
		cover: {
			type: String,
			required: [true, "cover image is required"],
		},
		dateTime: {
			type: String,
			required: [true, "date and time is required"],
		},
		content: {
			type: String,
			required: [true, "Text content is required"],
		},
		register: {
			type: Number,
			default: 0,
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
const Event = models.event || model("event", eventSchema);

module.exports = Event;
