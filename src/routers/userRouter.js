const express = require("express");
const {
	userSignup,
	userLogin,
	userProfile,
	users,
	userLogout,
	userProfileUpdate,
	userPassowrdUpdate,
	userForgetPassword,
	userResetPassword,
} = require("../controllers/userController");
const { isLogedIn } = require("../middleware/isLogedIn");

const userRouter = express.Router();

userRouter.post("/signup", userSignup);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/:token", isLogedIn, userProfile);
userRouter.post("/update-profile/:token", isLogedIn, userProfileUpdate);
userRouter.post("/update-password/:token", isLogedIn, userPassowrdUpdate);
userRouter.post("/forget-password", userForgetPassword);
userRouter.put("/reset-password/:id/:token", userResetPassword);
userRouter.get("/", users);

module.exports = userRouter;
