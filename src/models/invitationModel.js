const { Schema, model, models } = require("mongoose");

const invitationSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		phone: {
			type: String,
			required: [true, "Phone Number is required"],
		},
		organizationName: {
			type: String,
			required: [true, "Organization Name is required"],
		},
		location: {
			type: String,
			required: [true, "location Name is required"],
		},
		eventText: {
			type: String,
			required: [true, "about event text is required"],
		},
		audienceNumber: {
			type: String,
			required: [true, "audience Number is required"],
		},
	},
	{ timestamps: true }
);

const Invitation = models.invitation || model("invitation", invitationSchema);

module.exports = Invitation;
