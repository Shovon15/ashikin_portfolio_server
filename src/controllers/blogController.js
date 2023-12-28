// const Blog = require("../models/blogModel");
// const findWithId = require("../services/findWithId");
// const { successResponse } = require("./responseController");

// const getBlogs = async (req, res, next) => {
// 	try {
// 		// console.log(req.file.filename);
// 		const data = await Blog.find();

// 		return successResponse(res, {
// 			statusCode: 200,
// 			message: "blog were return successfully!!!",
// 			payload: { data },
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const getPublishedBlogs = async (req, res, next) => {
// 	try {
// 		const data = await Blog.find({ isPublished: true });

// 		return successResponse(res, {
// 			statusCode: 200,
// 			message: "Published Blog return Successfully",
// 			payload: {
// 				data,
// 			},
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const getBlogById = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;

// 		const data = await findWithId(Blog, id);

// 		return successResponse(res, {
// 			statusCode: 200,
// 			message: "blog return successfully!!!",
// 			payload: {
// 				data,
// 			},
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const createBlog = async (req, res, next) => {
// 	try {
// 		const { title, cover, content } = req.body;

// 		if (title || cover || content) {
// 			await Blog.create({
// 				title,
// 				cover,
// 				content,
// 			});
// 		}
// 		// Blog.create({ cover: req.file.filename, blogText: req.body.text });
// 		return successResponse(res, {
// 			statusCode: 200,
// 			message: "Blog created successfully!",
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const updateBlogById = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;
// 		const formData = req.body;

// 		const existingBlog = await findWithId(Blog, id);

// 		if (!existingBlog) {
// 			throw createError(404, "Blog not found");
// 		}

// 		const updateFields = {};

// 		if (formData.isPublished !== undefined) {
// 			updateFields.isPublished = !existingBlog.isPublished;
// 		}

// 		if (formData.cover !== undefined) {
// 			updateFields.cover = formData.cover;
// 		}

// 		if (formData.title !== undefined) {
// 			updateFields.title = formData.title;
// 		}

// 		if (formData.content !== undefined) {
// 			updateFields.content = formData.content;
// 		}

// 		await Blog.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

// 		return successResponse(res, {
// 			statusCode: 200,
// 			message: "Blog updated successfully!",
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// const deleteBlogById = async (req, res, next) => {
// 	try {
// 		const id = req.params.id;

// 		const blog = await findWithId(Blog, id);

// 		if (!blog) {
// 			throw createError(404, "Blog not found.");
// 		}

// 		await Blog.findByIdAndDelete(id);

// 		return successResponse(res, {
// 			statusCode: 200,
// 			message: "Blog deleted successfully.",
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };

// module.exports = {
// 	getBlogs,
// 	getPublishedBlogs,
// 	getBlogById,
// 	createBlog,
// 	updateBlogById,
// 	deleteBlogById,
// };
