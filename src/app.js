const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const path = require('path');

const { errorResponse } = require("./controllers/responseController");
const connectDB = require("./config/db");
const bannerRouter = require("./routers/bannerRoutes");
const reviewRouter = require("./routers/reviewRouter");
const seedRouter = require("./routers/seedRouter");
const blogRouter = require("./routers/blogRouter");
const eventRouter = require("./routers/eventRoutes");
const serviceRouter = require("./routers/serviceRouter");
const invitationRouter = require("./routers/invitationRouter");
const userRouter = require("./routers/userRouter");
const logoRouter = require("./routers/logoRoutes");
const socialRouter = require("./routers/socialRoutes");
const brandRouter = require("./routers/brandRoutes");

const app = express();

app.use(cors());
// middleware--------------------
app.use(morgan("dev"));
app.use(cookieParser());

// app.use(bodyParser.json({ limit: "100mb" }));
// app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/temp"));

app.use("/api/admin", userRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/invitation", invitationRouter);
app.use("/api/services", serviceRouter);
app.use("/api/events", eventRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/logo", logoRouter);
app.use("/api/social", socialRouter);
app.use("/api/brands", brandRouter);
// app.use("/api/seed", seedRouter);

app.get("/", (req, res) => {
	res.status(200).send({
		message: "welcome to portfolio server!!!",
	});
});
app.get("/demo", (req, res) => {
	res.status(200).send({
		message: "demo route!!!",
	});
});
connectDB();

// -----------------------------------------------------
//client error--------------------
app.use((req, res, next) => {
	next(createError(404, "Route not found."));
});

//server error------------------
app.use((err, req, res, next) => {
	return errorResponse(res, {
		statusCode: err.status,
		message: err.message,
	});
});

module.exports = app;
