const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
	try {
		// BUGFIX: credentials were hardcoded in source (a serious security issue,
		// and the likely root cause of asset/upload failures if these keys were
		// ever rotated or rate-limited). Now read from environment variables.
		const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

		if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
			console.warn(
				"[cloudinary] Missing CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET " +
				"in environment variables. Image/video uploads will fail until these are set."
			);
		}

		cloudinary.config({
			cloud_name: CLOUDINARY_CLOUD_NAME,
			api_key: CLOUDINARY_API_KEY,
			api_secret: CLOUDINARY_API_SECRET,
		});
		console.log('Cloudinary connected successfully')
	} catch (error) {
		console.log('Error while connecting to Cloudinary');
		console.log(error);
	}
};


