const multer = require('multer');

// Set up multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // File name format
  },
});

// Create the multer upload middleware without file filter
const upload = multer({
  storage: storage,
});

module.exports = { upload };  // Export the upload middleware
