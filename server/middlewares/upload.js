import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const upload = multer({ storage });

export const uploadMessageImage = (req, res, next) => {
  const singleUpload = upload.single("image");
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: "Upload failed", error: err });
    }

    if (req.file) {
      req.body.imageUrl = `/uploads/${req.file.filename}`;
    }

    next();
  });
};

export const uploadAvatar = (req, res, next) => {
  const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"), false);
    }
  };

  const avatarUpload = multer({
    storage,
    fileFilter: imageFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single("avatar");

  avatarUpload(req, res, function (err) {
    if (err) {
      return res.status(400).json({ message: err.message || "Upload failed" });
    }
    next();
  });
};
