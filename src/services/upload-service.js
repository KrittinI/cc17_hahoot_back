const cloudinary = require("../config/cloudinary");
const createError = require("../utils/create-error");
const uploadService = {};
uploadService.upload = async (path) => {
  try {
    const { secure_url } = await cloudinary.uploader.upload(path);
    return secure_url;
  } catch (err) {
    createError(err.message, 500);
  }
};

uploadService.deleteArr = async (arr) => {
  try {
    const promises = [];
    for (let image of arr) {
      const src = image.split("/").pop().split(".")[0];
      const result = cloudinary.uploader.destroy(src);
      promises.push(result);
    }
    await Promise.all(promises);
  } catch (error) {
    next(error);
  }
};
module.exports = uploadService;
