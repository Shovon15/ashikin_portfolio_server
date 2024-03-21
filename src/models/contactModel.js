const { Schema, model, models } = require("mongoose");

const contactSchema = new Schema(
	{
		title: {
			type: String,
			requier: [true, "contact title is required"],
		},
		description: {
			type: String,
			requier: [true, "contact description is required"],
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
const Contact = models.contact || model("contact", contactSchema);

module.exports = Contact;
