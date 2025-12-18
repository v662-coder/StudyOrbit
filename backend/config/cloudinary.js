const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			cloud_name: 'dhot8xkbf',
			api_key:'967256138719194',
			api_secret:'X5OtlEl9UVWtRkDgjM1qHkPL42o',
		});
		console.log('Cloudinary connected successfully')
	} catch (error) {
		console.log(error);
	}
};


