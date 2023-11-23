const createError = require("http-errors");
const { successResponse } = require("./responseController");

const getUsers = async (req, res, next) => {
	try {
		// const search = req.query.search || "";
		// const page = Number(req.query.page) || 1;
		// const limit = Number(req.query.limit) || 5;
		// const searchRegExp = new RegExp(".*" + search + ".*", "i"); //'i' is case insensitive for seraching

		// const filter = {
		// 	isAdmin: { $ne: true },
		// 	$or: [
		// 		{
		// 			name: { $regex: searchRegExp },
		// 		},
		// 		{
		// 			email: { $regex: searchRegExp },
		// 		},
		// 		{
		// 			phone: { $regex: searchRegExp },
		// 		},
		// 	],
		// };

		// const options = { password: 0 }; //don't return password

		// const count = await User.find(filter).countDocuments(); //count users also while filtering

		// const users = await User.find(filter, options)
		// 	.limit(limit)
		// 	.skip((page - 1) * limit);

		const users = [
			{ id: 1, name: "kamal" },
			{ id: 2, name: "rahim" },
		];

		if (!users) throw createError(404, "No users found ");

		return successResponse(res, {
			statusCode: 200,
			message: "User were return successfully!!!",
			payload: {
				users,
				// pagination: {
				// 	totalPage: Math.ceil(count / limit),
				// 	currentPage: page,
				// 	previousPage: page - 1 > 0 ? page - 1 : null,
				// 	nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
				// },
			},
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getUsers };
