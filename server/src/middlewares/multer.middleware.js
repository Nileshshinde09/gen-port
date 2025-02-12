import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb ) => {
    const tempDir = path.resolve("public/temp");
    cb(null, tempDir); // Callback with destination
  },
  filename: (reqt, file, cb) => {
    cb(null, file.originalname); 
  },
});

export const uploadMultiple = multer({
  storage,
}).array("uploadedImages");

export const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1000 * 1000, 
  },
});

export const uploadSingle = multer({
  storage,
}).array("files");
