const express = require("express");
const { userLogin, getUserById, userProfile, users } = require("../controllers/userController");
const User = require("../models/userModel");
const { verify } = require("jsonwebtoken");
const { jwtActivationKey } = require("../secret");

const authGuard = async (req, res, next) => {
	if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
		try {
			const token = req.headers.authorization.split(" ")[1];
			const { id } = verify(token, jwtActivationKey);
			req.user = await User.findById(id).select("-password");
			next();
		} catch (error) {
			let err = new Error("Not authorized, Token failed");
			err.statusCode = 401;
			next(err);
		}
	} else {
		let error = new Error("Not authorized, No token");
		error.statusCode = 401;
		next(error);
	}
};

const userRouter = express.Router();

// userRouter.get("/:id", getUserById);
userRouter.post("/login", userLogin);
userRouter.get("/profile", authGuard, userProfile);
userRouter.get("/",  users);

// app.get("/user", (req, res) => {
// 	res.status(200).send({
// 		message: "this is get methode!!!",
// 		user,
// 	});
// });
// app.post("/post", (req, res) => {
// 	res.status(200).send({
// 		message: "this is post methode!!!",
// 	});
// });

module.exports = userRouter;
