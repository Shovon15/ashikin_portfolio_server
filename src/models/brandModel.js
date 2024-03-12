const { Schema, model, models } = require("mongoose");

const brandSchema = new Schema(
	{
		brandLogo: {
			type: String,
			requier: [true, "logo image is required"],
			default: "",
		},
	},
	{
		timestamps: true,
	}
);
const Brand = models.brand || model("brand", brandSchema);

module.exports = Brand;
