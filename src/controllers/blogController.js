const Blog = require("../models/blogModel");
const { successResponse } = require("./responseController");

// const createBlog = async (req, res, next) => {
// 	try {
// 		console.log(req.file.filename);
// 		console.log(req.body);

// 		Blog.create({ cover: req.file.filename, blogText: req.body.text });
// 		return successResponse(res, {
// 			statusCode: 200,
// 			message: "blog create successfully!!!",
// 			// payload: {},
// 		});
// 	} catch (error) {
// 		next(error);
// 	}
// };
const getBlog = async (req, res, next) => {
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

module.exports = {
	// createBlog,
	getBlog,
};
