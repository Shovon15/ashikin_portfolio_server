const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const { errorResponse } = require("./controllers/responseController");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");
const eventRouter = require("./routers/eventRoutes");
const blogRouter = require("./routers/blogRouter");

const app = express();

app.use(cors());
// middleware--------------------
app.use(morgan("dev"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// const publicDir = require("path").join(__dirname, "/public");
// app.use(express.static(publicDir));

app.use(express.static("public"));
// app.use("/public", express.static(__dirname + "/public"));
// app.use('/public/images',express.static(__dirname + '/public/images'));

app.use("/api/admin", userRouter);
app.use("/api/events", eventRouter);
app.use("/api/blogs", blogRouter);
app.use("/api/seed", seedRouter);

app.get("/", (req, res) => {
	res.status(200).send({
		message: "welcome to portfolio server!!!",
	});
});

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
