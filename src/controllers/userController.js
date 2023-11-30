const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const { successResponse, errorResponse } = require("./responseController");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");
const { createJsonWebToken } = require("../helper/createJwt");
const { jwtActivationKey } = require("../secret");

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
		// Compare the provided password with the stored hashed password
		const isPasswordMatch = await bcrypt.compare(password, user.password);

		if (!isPasswordMatch) {
			return errorResponse(res, {
				statusCode: 401,
				message: "Incorrect password",
			});
		}

		// Generate JWT token
		// const token = jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' });
		// const token = "jwt.sign({ userId: user._id }, 'yourSecretKey', { expiresIn: '1h' })";
		// const webToken = createJsonWebToken({ name: user.name, email, password }, jwtActivationKey, "30d");

		return successResponse(res, {
			statusCode: 200,
			message: "Login successful",
			payload: {
				id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				token: await user.generateJWT(),
			},
		});
	} catch (error) {
		next(error);
	}
};

const userProfile = async (req, res, next) => {
	try {
		let user = await User.findById(req.user._id);

		return successResponse(res, {
			statusCode: 201,
			message: `user profile return successfully`,
			payload: {
				user,
			},
		});
	} catch (error) {
		next(error);
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
		next(error);
	}
};

module.exports = {
	users,
	userLogin,
	userProfile,
};
