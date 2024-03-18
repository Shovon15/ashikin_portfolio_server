const { Schema, model, models } = require("mongoose");

const bannerSchema = new Schema(
	{
		bannerHeader: {
			type: String,
			requier: [true, "banner header is required"],
		},
		bannerText: {
			type: String,
			requier: [true, "banner text is required"],
		},
		imageList: {
			type: Array,
			requier: [true, "image  is required"],
		},
	},
	{
		timestamps: true,
	}
);
const Banner = models.banner || model("banner", bannerSchema);

module.exports = Banner;