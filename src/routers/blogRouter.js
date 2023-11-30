const express = require("express");

const upload = require("../middleware/uploadFile");
const { createBlog, getBlog } = require("../controllers/blogController");

const blogRouter = express.Router();

blogRouter.get("/", getBlog);
// blogRouter.post("/upload-blog", upload.single("file"), createBlog);

module.exports = blogRouter;
