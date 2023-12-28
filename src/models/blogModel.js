const { Schema, model, models } = require("mongoose");

const blogSchema = new Schema(
	{
		title: {
			type: String,
			requier: [true, "title is required"],
		},
		cover: {
			type: String,
			requier: [true, "image is required"],
		},
		content: {
			type: String,
			requier: [true, "blog content is required"],
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
const Blog = models.blog || model("blog", blogSchema);

module.exports = Blog;
