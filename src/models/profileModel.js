const { Schema, model, models } = require("mongoose");

const profileSchema = new Schema(
	{
		profileHeader: {
			type: String,
			requier: [true, "profile header is required"],
		},
		description: {
			type: String,
			requier: [true, "description is required"],
		},
		profileImage: {
			type: String,
			requier: [true, "image  is required"],
		},
	},
	{
		timestamps: true,
	}
);
const Profile = models.profile || model("profile", profileSchema);

module.exports = Profile;