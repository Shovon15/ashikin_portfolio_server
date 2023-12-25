const express = require("express");

const {
	getBlogs,
	getPublishedBlogs,
	createBlog,
	updateBlogById,
	deleteBlogById,
	getBlogById,
} = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get("/all", getBlogs);
blogRouter.get("/published", getPublishedBlogs);
blogRouter.post("/write-blog", createBlog);
blogRouter.put("/:id", updateBlogById);
blogRouter.delete("/:id", deleteBlogById);
blogRouter.get("/:id", getBlogById);

module.exports = blogRouter;
