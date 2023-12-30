const { models } = require("mongoose");
const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const eventSchema = new Schema(
	{
		title: {
			type: String,
			required: [true, "title is required"],
		},
		eventType: {
			type: String,
			required: [true, "Event type is required"],
		},
		cover: {
			type: String,
			required: [true, "cover image is required"],
		},
		dateTime: {
			type: String,
			required: [true, "date and time is required"],
		},
		content: {
			type: String,
			required: [true, "Text content is required"],
		},
		register: {
			type: Number,
			default: 0,
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

eventSchema.pre("save", async function (next) {
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
	const existingEvents = await this.constructor.find({
		slug: { $regex: slugRegex },
	});

	if (existingEvents.length > 0) {
		// If there are existing events with similar slugs, add a numerical suffix
		this.slug = `${originalSlug}-${existingEvents.length + 1}`;
	} else {
		// Otherwise, use the original slug
		this.slug = originalSlug;
	}

	next();
});

const Event = models.event || model("event", eventSchema);

module.exports = Event;
