const Banner = require("../models/bannerModel");
const createError = require("http-errors");
const { successResponse } = require("./responseController");
const Profile = require("../models/profileModel");

const updateProfile = async (req, res, next) => {
	try {
		const formData = req.body;

		const updateFields = {};

		if (formData.heading !== undefined) {
			updateFields.profileHeader = formData.heading;
		}

		if (formData.description !== undefined) {
			updateFields.description = formData.description;
		}

		if (formData.profileImage !== undefined && formData.profileImage !== null) {
			updateFields.profileImage = formData.profileImage;
		}

		const updatedProfile = await Profile.findOneAndUpdate({}, { $set: updateFields }, { new: true });

		if (!updatedProfile) {
			throw createError(404, "Profile not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Profile updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const getProfile = async (req, res, next) => {
	try {
		const data = await Profile.find();
		if (!data) {
			throw createError(404, "profile data not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "Profile return successfully!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};
const createProfile = async (req, res, next) => {
	try {
		const { heading, description, profileImage } = req.body;

		await Profile.deleteMany();

		if (!(heading || description || profileImage)) {
			throw createError(404, "All Field is required.");
		}
		await Profile.create({
			profileHeader: heading,
			description,
			profileImage,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "Profile successfully created",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getProfile, createProfile, updateProfile };
