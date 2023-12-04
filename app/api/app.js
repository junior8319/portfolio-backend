const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const {
  stacksRouter,
  projectsRouter,
  stacksProjectsRouter,
  loginRouter,
} = require('../routes/index.routes');
const uploadToCloudBucket = require('../helpers/uploadToBucket');
const app = express();
require('dotenv').config();

app.use(express.json()); // parse json bodies
app.use(cors()); // allow all origins

app.use('/stacks', stacksRouter);
app.use('/projects', projectsRouter);
app.use('/stacks-projects', stacksProjectsRouter);
app.use('/users', loginRouter);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

app.post('/upload', upload.single('snapshot'), (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    uploadToCloudBucket(req.file);

    return res.status(200).json({
      message: 'File uploaded successfully!',
      imageUrl: `https://storage.googleapis.com/antonio-portfolio-bucket/${req.file.filename}`,
      file: req.file,
    });
  }
});

app.delete('/files/delete/:filename', (req, res) => {
  const { filename } = req.params;

  if (fs.existsSync(
    path.join(__dirname, `../public/images/${filename}`)
  )) {
    fs.unlinkSync(path.join(__dirname, `../public/images/${filename}`));

    return res.status(202).json({
      message: 'File deleted successfully',
    });
  } else {
    res.status(404).json({
      message: `File ${filename} not found`,
    });
  }
});

module.exports = app;