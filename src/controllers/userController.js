const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { successResponse, errorResponse } = require("./responseController");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const { createJsonWebToken } = require("../helper/createJwt");
const { jwtActivationKey, clientUrl } = require("../secret");
const jwt = require("jsonwebtoken");
const findeWithId = require("../services/findWithId");
const sendEmailWithNodeMailer = require("../helper/email");

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

const userForgetPassword = async (req, res, next) => {
	try {
		// const id = req.userId;
		const { reqEmail } = req.body;

		const userData = await User.findOne({ email: reqEmail });

		if (!userData) {
			throw createError(404, "This email is not associated with our Database. please signup first.");
		}
		const { _id, email, name } = userData;

		const webToken = createJsonWebToken({ email }, jwtActivationKey, "10m");

		const emailData = {
			email: email,
			subject: "Password Reset Email",
			html: `<h2>Hello ${name}</h2>
			<p>Please <a href="${clientUrl}/reset-password/${_id}/${webToken}" target="_blank">click here</a> to reset your password. The validation period for this password reset link is 10 minutes.</p>`,
		};

		try {
			await sendEmailWithNodeMailer(emailData);
		} catch (error) {
			next(createError(500, "Failed to send reset password email"));
			return;
		}

		await User.findByIdAndUpdate(_id, { $set: { passwordResetToken: webToken } }, { new: true });

		return successResponse(res, {
			statusCode: 201,
			message: `Please go to your ${email} and reset Password.`,
		});
	} catch (error) {
		return next(error);
	}
};
const userResetPassword = async (req, res, next) => {
	try {
		const { id, token } = req.params;
		const { password, confirmPassword } = req.body;

		const userData = await User.findOne({ _id: id });

		if (!userData) {
			throw createError(404, "Invaid User");
		}

		if (password.length < 6 || confirmPassword.length < 6) {
			throw createError(401, "Password should be minimum 6 digits");
		}

		if (password !== confirmPassword) {
			throw createError(400, "New password and confirm new password do not match");
		}

		const decoded = jwt.verify(token, jwtActivationKey);
		// console.log(decoded, "decoded");

		if (!decoded) {
			throw createError(401, "Invalid password Reset token");
		}

		const loginToken = createJsonWebToken({ id }, jwtActivationKey, "30d");

		await User.findByIdAndUpdate(id, { $set: { password: password } }, { new: true });

		return successResponse(res, {
			statusCode: 201,
			message: `Password Reset Successfully.`,
			payload: {
				token: loginToken,
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
	userForgetPassword,
	userResetPassword,
};
