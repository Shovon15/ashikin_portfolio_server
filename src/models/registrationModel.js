const { Schema, model, models } = require("mongoose");

const registrationSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, "First Name is required"],
		},
		lastName: {
			type: String,
			required: [true, "Last Name is required"],
		},

		whatsapp: {
			type: String,
			required: [true, "whatsapp number is required"],
		},

		phone: {
			type: String,
			required: [true, "Phone Number is required"],
		},
		email: {
			type: String,
			required: [true, "email is required"],
		},
		instituteName: {
			type: String,
			required: [true, "location Name is required"],
		},
		accountNumber: {
			type: String,
			required: [true, "audience Number is required"],
		},
		eventSlug: {
			type: String,
			required: [true, "Event Slug is required"],
		},
		eventTitle: {
			type: String,
			required: [true, "Event Title is required"],
		},
	},
	{ timestamps: true }
);

const Registration = models.registration || model("registration", registrationSchema);

module.exports = Registration;
