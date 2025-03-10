import multer from 'multer';
import fs from 'fs';
import path from 'path';
// Define the directory first
const tempDir = path.resolve("public/temp");

// Ensure the directory exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir); // Set the upload destination
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Keep original filename
  },
});


export const upload = multer({
  storage,
  limits: {
    fileSize: 1 * 1000 * 1000, 
  },
});



export const uploadMultiple = multer({
  storage,
}).array("uploadedImages");

export const uploadSingle = multer({
  storage,
}).array("files");
