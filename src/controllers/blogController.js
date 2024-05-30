const Blog = require("../models/blogModel");
const findWithId = require("../services/findWithId");
const findWithSlug = require("../services/findWithSlug");
const { successResponse } = require("./responseController");

const getBlogs = async (req, res, next) => {
	try {
		// console.log(req.file.filename);
		const data = await Blog.find();

		return successResponse(res, {
			statusCode: 200,
			message: "blog were return successfully!!!",
			payload: { data },
		});
	} catch (error) {
		next(error);
	}
};

const getPublishedBlogs = async (req, res, next) => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 8;
		const skip = (page - 1) * limit;

		
		const data = await Blog.find({ isPublished: true }).limit(limit).skip(skip);
		const count = await Blog.find({ isPublished: true }).countDocuments();

		if (data.length === 0) {
			return successResponse(res, {
				statusCode: 200,
				message: "No Published Blog found",
				payload: {data,
					pagination: {
						totalPages: Math.ceil(count / limit),
						currentPage: page,
						previousPage: page - 1 > 0 ? page - 1 : null,
						nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1: null,
					}
				},
			});
		}
		
		return successResponse(res, {
			statusCode: 200,
			message: "Published Blog return Successfully",
			payload: {
				data,
				pagination: {
					totalPages: Math.ceil(count / limit),
					currentPage: page,
					previousPage: page - 1 > 0 ? page - 1 : null,
					nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1: null,
				}
			},
		});
	} catch (error) {
		next(error);
	}
};

const getBlogBySlug = async (req, res, next) => {
	try {
		const { slug } = req.params;

		const data = await findWithSlug(Blog, slug);

		return successResponse(res, {
			statusCode: 200,
			message: "blog return successfully!!!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};

const createBlog = async (req, res, next) => {
	try {
		const { title, cover, content } = req.body;

		if (title || cover || content) {
			await Blog.create({
				title,
				cover,
				content,
			});
		}
		// Blog.create({ cover: req.file.filename, blogText: req.body.text });
		return successResponse(res, {
			statusCode: 200,
			message: "Blog created successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const updateBlogBySlug = async (req, res, next) => {
	try {
		const { slug } = req.params;
		const formData = req.body;

		const existingBlog = await findWithSlug(Blog, slug);

		if (!existingBlog) {
			throw createError(404, "Blog not found");
		}

		const updateFields = {};

		if (formData.isPublished !== undefined) {
			updateFields.isPublished = !existingBlog.isPublished;
		}

		if (formData.cover !== undefined) {
			updateFields.cover = formData.cover;
		}

		if (formData.title !== undefined) {
			updateFields.title = formData.title;
		}

		if (formData.content !== undefined) {
			updateFields.content = formData.content;
		}

		await Blog.findOneAndUpdate({ slug }, { $set: updateFields }, { new: true });

		return successResponse(res, {
			statusCode: 200,
			message: "Blog updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const deleteBlogById = async (req, res, next) => {
	try {
		const id = req.params.id;

		const blog = await findWithId(Blog, id);

		if (!blog) {
			throw createError(404, "Blog not found.");
		}

		await Blog.findByIdAndDelete(id);

		return successResponse(res, {
			statusCode: 200,
			message: "Blog deleted successfully.",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getBlogs,
	getPublishedBlogs,
	getBlogBySlug,
	createBlog,
	updateBlogBySlug,
	deleteBlogById,
};
