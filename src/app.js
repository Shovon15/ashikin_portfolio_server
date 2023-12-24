const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const { errorResponse } = require("./controllers/responseController");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const eventRouter = require("./routers/eventRoutes");
const blogRouter = require("./routers/blogRouter");
const invitationRouter = require("./routers/invitationRouter");
const serviceRouter = require("./routers/serviceRouter");

const app = express();

app.use(cors());
// middleware--------------------
app.use(morgan("dev"));
app.use(cookieParser());

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(express.static("public"));

app.use("/api/admin", userRouter);
app.use("/api/invitation", invitationRouter);
app.use("/api/services", serviceRouter);
app.use("/api/events", eventRouter);
app.use("/api/blogs", blogRouter);
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
