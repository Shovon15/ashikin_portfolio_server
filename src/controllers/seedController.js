// const data = require("../../seedData");
// const User = require("../models/userModel");

// const seedUser = async (req, res, next) => {
// 	try {
// 		// delete existing data
// 		await User.deleteMany({});

// 		//  insert data
// 		const users = await User.insertMany(data.users);

// 		// successful response
// 		return res.status(201).json(users);
// 	} catch (error) {
// 		next(error);
// 	}
// };
// module.exports = { seedUser };
