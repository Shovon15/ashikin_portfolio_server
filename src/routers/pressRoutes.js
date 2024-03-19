const express = require("express");
const { getPress, createPress, getPressById, updatePress, deletePress } = require("../controllers/pressController");

const pressRoute = express.Router();

pressRoute.get("/all", getPress);
pressRoute.get("/:_id", getPressById);
pressRoute.post("/create-press", createPress);
pressRoute.put("/update-press/:_id", updatePress);
pressRoute.delete("/:_id", deletePress);

module.exports = pressRoute;
