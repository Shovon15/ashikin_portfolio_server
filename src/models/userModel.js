const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const { jwtActivationKey } = require("../secret");
const { sign } = require("jsonwebtoken");

const userSchema = new Schema(
	{
		name: {
			type: String,
		},
		email: {
			type: String,
			required: [true, "email is required"],
			trim: true,
			unique: true,
			lowercase: true,
			validate: {
				validator: function (v) {
					return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
				},
				message: "Please enter a valid email",
			},
		},
		password: {
			type: String,
			required: [true, "password is required"],
			trim: true,
			minLength: [6, "password should be minimum 6 charectures"],
			set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
		},
		isAdmin: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);
userSchema.methods.generateJWT = async function () {
	return await sign({ id: this._id }, jwtActivationKey, {
		expiresIn: "30d",
	});
};
const User = model("user", userSchema);

module.exports = User;