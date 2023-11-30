const { Schema, model } = require("mongoose");

const blogSchema = new Schema(
	{
		cover: String,
		blogText: String,
	},
	{
		timestamps: true,
	}
);
const Blog = model("blog", blogSchema);

module.exports = Blog;
