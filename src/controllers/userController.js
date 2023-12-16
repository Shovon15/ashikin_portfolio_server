const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { successResponse, errorResponse } = require("./responseController");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const { createJsonWebToken } = require("../helper/createJwt");
const { jwtActivationKey } = require("../secret");
const findeWithId = require("../services/findWithId");

const userLogin = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			statusCode: 400,
			message: "Validation failed",
			errors: errors.array(),
		});
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return errorResponse(res, {
				statusCode: 401,
				message: "Incorrect email",
			});
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return errorResponse(res, {
				statusCode: 401,
				message: "Incorrect password",
			});
		}

		const token = await user.generateJWT();

		// res.cookie("token", token, {
		// 	httpOnly: true,
		// 	secure: true,
		// 	sameSite: "none",
		// });

		return successResponse(res, {
			statusCode: 200,
			message: "Login successful",
			payload: {
				token,
			},
		});
	} catch (error) {
		return next(error);
	}
};
const userLogout = async (req, res, next) => {
	try {
		// res.clearCookie("token");

		return successResponse(res, {
			statusCode: 200,
			message: "Logout successful",
			payload: {},
		});
	} catch (error) {
		return next(error);
	}
};

const userProfile = async (req, res, next) => {
	try {
		const id = req.userId;

		let user = await User.findById(id).select("-password");

		return successResponse(res, {
			statusCode: 201,
			message: `user profile return successfully`,
			payload: {
				user,
			},
		});
	} catch (error) {
		return next(error);
	}
};
const userProfileUpdate = async (req, res, next) => {
	try {
		const id = req.userId;
		const formData = req.body;
		const user = await findeWithId(User, id);

		if (!user) {
			throw createError(404, "User not found");
		}

		const updateFields = {};

		if (formData.cover !== undefined) {
			updateFields.avatar = formData.cover;
		}
		if (formData.name !== undefined) {
			updateFields.name = formData.name;
		}

		await User.findByIdAndUpdate(id, { $set: updateFields }, { new: true });

		return successResponse(res, {
			statusCode: 201,
			message: `Profile Updated Successfully`,
		});
	} catch (error) {
		return next(error);
	}
};
const userPassowrdUpdate = async (req, res, next) => {
	try {
		const id = req.userId;
		const { oldPassword, newPassword, confirmNewPassword } = req.body;

		// console.log({ oldPassword, newPassword, confirmNewPassword });
		const user = await findeWithId(User, id);

		if (!user) {
			throw createError(404, "User not found");
		}
		if (newPassword.length < 6 || confirmNewPassword.length < 6) {
			throw createError(401, "Password should be minimum 6 digits");
		}

		const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

		if (!isPasswordMatch) {
			throw createError(401, "Invalid current password");
		}

		if (newPassword !== confirmNewPassword) {
			throw createError(400, "New password and confirm password do not match");
		}

		await User.findByIdAndUpdate(id, { $set: { password: newPassword } }, { new: true });

		return successResponse(res, {
			statusCode: 201,
			message: `Password Updated Successfully`,
		});
	} catch (error) {
		return next(error);
	}
};
const users = async (req, res, next) => {
	try {
		let user = await User.find();

		return successResponse(res, {
			statusCode: 201,
			message: `user profile return successfully`,
			payload: {
				user,
			},
		});
	} catch (error) {
		return next(error);
	}
};

module.exports = {
	users,
	userLogin,
	userLogout,
	userProfile,
	userProfileUpdate,
	userPassowrdUpdate,
};
