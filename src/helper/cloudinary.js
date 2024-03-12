
const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
const { cloudApiKey, cloudApiSecret, cloudName } = require("../secret");

cloudinary.config({
	cloud_name: cloudName,
	api_key: cloudApiKey,
	api_secret: cloudApiSecret,
});

 const uploadOnCloudinary = async (localFilePath, width, height) => {
		try {
			if (!localFilePath) return null;
			//upload the file on cloudinary
			const response = await cloudinary.uploader.upload(localFilePath, {
				resource_type: "auto",
				width: width,
				height: height,
			});
			// file has been uploaded successfull
			//console.log("file is uploaded on cloudinary ", response.url);
			fs.unlinkSync(localFilePath);
			return response;
		} catch (error) {
			fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
			return null;
		}
 };

module.exports = { uploadOnCloudinary };