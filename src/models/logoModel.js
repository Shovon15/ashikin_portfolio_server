const { Schema, model, models } = require("mongoose");

const logoSchema = new Schema(
	{
		logoImage: {
			type: String,
			requier: [true, "logo image is required"],
			default: "",
		},
	},
	{
		timestamps: true,
	}
);
const Logo = models.logo || model("logo", logoSchema);

module.exports = Logo;
