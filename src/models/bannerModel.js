const { Schema, model, models } = require("mongoose");

const bannerSchema = new Schema(
	{
		bannerHeader: {
			type: String,
			requier: [true, "banner header is required"],
			default: "",
		},
		bannerText: {
			type: String,
			requier: [true, "tbanner ext is required"],
			default: "",
		},
		backgroundImage: {
			type: String,
			requier: [true, "background image is required"],
			default: "",
		},
		portfolioImage: {
			type: String,
			requier: [true, "portfolio imagw is required"],
			default: "",
		},
	},
	{
		timestamps: true,
	}
);
const Banner = models.banner || model("banner", bannerSchema);

module.exports = Banner;