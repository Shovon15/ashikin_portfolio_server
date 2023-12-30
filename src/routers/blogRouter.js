const express = require("express");

const {
	getBlogs,
	getPublishedBlogs,
	createBlog,
	updateBlogBySlug,
	deleteBlogById,
	getBlogBySlug,
} = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get("/all", getBlogs);
blogRouter.get("/published", getPublishedBlogs);
blogRouter.post("/write-blog", createBlog);
blogRouter.put("/:slug", updateBlogBySlug);
blogRouter.delete("/:id", deleteBlogById);
blogRouter.get("/:slug", getBlogBySlug);

module.exports = blogRouter;
