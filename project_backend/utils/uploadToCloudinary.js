const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadToCloudinary = (buffer, originalname) => {
  return new Promise((resolve, reject) => {
    const ext = path.extname(originalname); // .pdf or .docx
    const baseName = path.basename(originalname, ext);
    const uniqueName = `${baseName}-${uuidv4()}${ext}`; // e.g., report-1234abcd.pdf

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'raw', // important for non-image files
        public_id: `srs_files/${uniqueName}`, // include folder and file extension
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

module.exports = uploadToCloudinary;
