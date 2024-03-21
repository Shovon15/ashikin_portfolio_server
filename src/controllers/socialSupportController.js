const createError = require("http-errors");
const { successResponse } = require("./responseController");
const findWithId = require("../services/findWithId");
const SocialSupport = require("../models/socialSupportModel");

const updateSocailSupport = async (req, res, next) => {
	try {
		const formData = req.body;
		const { _id } = req.params;

		const updateFields = {};

		if (formData.title !== undefined) {
			updateFields.title = formData.title;
		}

		if (formData.description !== undefined) {
			updateFields.description = formData.description;
		}


		if (formData.image !== undefined && formData.image !== null) {
			updateFields.image = formData.image;
		}

		if (formData.isPublished !== undefined) {
			updateFields.isPublished = formData.isPublished;
		}

		const updatedData = await SocialSupport.findOneAndUpdate({ _id }, { $set: updateFields }, { new: true });

		if (!updatedData) {
			throw createError(404, "social support data not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "social support updated successfully!",
		});
	} catch (error) {
		next(error);
	}
};

const getSocialSupport = async (req, res, next) => {
	try {
		const data = await SocialSupport.find();

		if (!data) {
			throw createError(404, "social support data not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "social support data return successfully!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};
const getSocialSupportById = async (req, res, next) => {
	try {
		const { _id } = req.params;
		const data = await SocialSupport.findById(_id);

		if (!data) {
			throw createError(404, "social support data not found.");
		}

		return successResponse(res, {
			statusCode: 200,
			message: "social support data return successfully!",
			payload: {
				data,
			},
		});
	} catch (error) {
		next(error);
	}
};
const deleteSocialSupport = async (req, res, next) => {
	try {
		const id = req.params._id;

		const data = await findWithId(SocialSupport, id);

		if (!data) {
			throw createError(404, "social support data not found.");
		}

		await SocialSupport.findByIdAndDelete(id);

		return successResponse(res, {
			statusCode: 200,
			message: "social support data deleted successfully!",
		});
	} catch (error) {
		next(error);
	}
};
const createSocialSupport = async (req, res, next) => {
	try {
		const { title, description,  image } = req.body;

		if (!(title || description || image)) {
			throw createError(400, "all field is required");
		}

		await SocialSupport.create({
			title,
			description,
			image,
		});

		return successResponse(res, {
			statusCode: 200,
			message: "social support successfully created",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getSocialSupport, createSocialSupport, getSocialSupportById, updateSocailSupport, deleteSocialSupport };
