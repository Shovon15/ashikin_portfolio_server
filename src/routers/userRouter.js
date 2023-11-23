const express = require("express");

const { getUsers } = require("../controllers/userController");


const userRouter = express.Router();


userRouter.get("/", getUsers);


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
