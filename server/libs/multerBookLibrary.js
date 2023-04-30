import multer from "multer";
import config from "../config/config.js";

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "book_pdf") {
    // if uploading resume
    if (file.mimetype === "application/pdf") {
      // check file type to be pdf
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else if (file.fieldname === "cover_image") {
    // else uploading image
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      // check file type to be png, jpeg, or jpg
      cb(null, true);
    } else {
      cb(null, false); // else fails
    }
  } else {
    cb(null, false); // else fails
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.filesPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  multipart: true,
});

const cpUpload = upload.fields([
  { name: "cover_image", maxCount: 1 },
  { name: "book_pdf", maxCount: 1 },
]);

export default cpUpload;
