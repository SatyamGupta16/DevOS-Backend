const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

/* ==============================
   Cloudinary Storage
============================== */

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "devos/avatars",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [
            {
                width: 500,
                height: 500,
                crop: "fill",
                gravity: "face",
            },
        ],
    },
});

/* ==============================
   Multer Upload
============================== */

const upload = multer({
    storage,

    limits: {
        fileSize: 5 * 1024 * 1024, // 5 MB
    },

    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Only image files are allowed"
                ),
                false
            );
        }
    },
});

module.exports = upload;