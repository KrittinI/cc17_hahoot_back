const uploadService = require("../services/upload-service");
const fs = require("fs/promises");

const cloudinaryController = {};

cloudinaryController.uploadArray = async (req, res, next) => {
  try {
    const promises = [];
    for (let i in req.files) {
      const result = uploadService.upload(req.files[i].path);
      promises.push(result);
    }
    const result = await Promise.all(promises);
    req.pictures = result;
    next();
  } catch (error) {
    next(error);
  } finally {
    for (let i in req.files) {
      fs.unlink(req.files[i].path);
    }
  }
};

module.exports = cloudinaryController;
