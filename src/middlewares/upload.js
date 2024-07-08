const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/images");
  },
  filename: (req, file, callback) => {
    const filename = `${new Date().getTime()}${Math.round(Math.random() * 100000)}.${file.mimetype.split("/")[1]}`;

    callback(null, filename);
  },
});

const upload = multer({ storage });
module.exports = upload;
