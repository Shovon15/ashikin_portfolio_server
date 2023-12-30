const { Schema, model, models } = require("mongoose");
const slugify = require("slugify");

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
		slug: {
			type: String,
			unique: true,
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
blogSchema.pre("save", async function (next) {
	const originalSlug = slugify(this.title, {
		replacement: "-",
		remove: /[^\w\s]/g,
		lower: true,
		strict: false,
		locale: "vi",
		trim: true,
	});

	// Check for uniqueness
	const slugRegex = new RegExp(`^${originalSlug}(-[0-9]+)?`);
	const existingBlog = await this.constructor.find({
		slug: { $regex: slugRegex },
	});

	if (existingBlog.length > 0) {
		// If there are existing events with similar slugs, add a numerical suffix
		this.slug = `${originalSlug}-${existingBlog.length + 1}`;
	} else {
		// Otherwise, use the original slug
		this.slug = originalSlug;
	}

	next();
});

const Blog = models.blog || model("blog", blogSchema);

module.exports = Blog;
