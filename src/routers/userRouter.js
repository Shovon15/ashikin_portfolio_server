const express = require("express");
const {
	userLogin,
	getUserById,
	userProfile,
	users,
	userLogout,
	userProfileUpdate,
	userPassowrdUpdate,
} = require("../controllers/userController");

const { isLogedIn } = require("../middleware/isLogedIn");

const userRouter = express.Router();

// userRouter.get("/:id", getUserById);
userRouter.post("/login", userLogin);
userRouter.post("/logout", userLogout);
userRouter.get("/:id", isLogedIn, userProfile);
userRouter.post("/update-profile/:id", isLogedIn, userProfileUpdate);
userRouter.post("/update-password/:id", isLogedIn, userPassowrdUpdate);
userRouter.get("/", users);

module.exports = userRouter;
