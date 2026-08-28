const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
  // BUGFIX: this previously caught upload errors, logged them, and returned
  // `undefined` instead of re-throwing. Every caller (course/profile
  // controllers) immediately does `thumbnailDetails.secure_url`, which threw
  // "Cannot read properties of undefined" and surfaced as an ugly, unhandled
  // 500 instead of a clean, informative error message. Now the error is
  // re-thrown so the caller's existing try/catch can respond properly.
  const options = { folder, resource_type: "auto" };
  if (height) options.height = height;
  if (quality) options.quality = quality;
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.log("Error while uploading image to Cloudinary");
    console.log(error);
    throw new Error("Could not upload image, please try again");
  }
};




// Function to delete a resource by public ID
exports.deleteResourceFromCloudinary = async (url) => {
    if (!url) return;

    try {
        const result = await cloudinary.uploader.destroy(url);
        console.log(`Deleted resource with public ID: ${url}`);
        console.log('Delete Resourse result = ', result)
        return result;
    } catch (error) {
        console.error(`Error deleting resource with public ID ${url}:`, error);
        throw error;
    }
};