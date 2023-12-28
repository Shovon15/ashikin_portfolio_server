// import express from "express";
// import {
// 	userLogin,
// 	getUserById,
// 	userProfile,
// 	users,
// 	userLogout,
// 	userProfileUpdate,
// 	userPassowrdUpdate,
// 	userForgetPassword,
// 	userResetPassword,
// } from "../controllers/userController";
// import isLogedIn from "../middleware/isLogedIn";

// const userRouter = express.Router();

// // userRouter.get("/:id", getUserById);
// userRouter.post("/login", userLogin);
// userRouter.post("/logout", userLogout);
// userRouter.get("/:token", isLogedIn, userProfile);
// userRouter.post("/update-profile/:token", isLogedIn, userProfileUpdate);
// userRouter.post("/update-password/:token", isLogedIn, userPassowrdUpdate);
// userRouter.post("/forget-password", userForgetPassword);
// userRouter.put("/reset-password/:id/:token", userResetPassword);
// userRouter.get("/", users);

// export default userRouter;
