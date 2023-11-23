const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const { errorResponse } = require("./controllers/responseController");
const userRouter = require("./routers/userRouter");

const app = express();

// middleware--------------------
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

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
