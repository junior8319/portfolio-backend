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
const { Storage } = require('@google-cloud/storage');
const uploadToCloudBucket = require('../helpers/uploadToBucket');
const app = express();
require('dotenv').config();

app.use(express.json()); // parse json bodies
app.use(cors()); // allow all origins

app.use('/stacks', stacksRouter);
app.use('/projects', projectsRouter);
app.use('/stacks-projects', stacksProjectsRouter);
app.use('/users', loginRouter);

const storage = new Storage({
  projectId: process.env.GCLOUD_KEY_PROJECT_ID,
  credentials: require(path.join(__dirname, '../api/config/gcloud-credentials.js')),
});

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

const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
app.get('/images/:filename', async (req, res) => {
  const { filename } = req.params;
  try {
    const filePath = `https://storage.googleapis.com/${bucketName}/${filename}`;

    const [exists] = await storage.bucket(bucketName).file(filename).exists();

    if (!exists) {
      return res.status(404).json({
        message: 'File not found!',
        file: filename,
      });
    }

    return res.status(200).json({
      message: 'File retrieved successfully!',
      file: filename,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong!',
      error,
    });
  }
});

app.delete('/files/delete/:filename', async (req, res) => {
  const { filename } = req.params;
  try {
    const bucketName = process.env.GCLOUD_STORAGE_BUCKET;

    await storage.bucket(bucketName).file(filename).delete();

    return res.status(202).json({
      message: 'File deleted successfully!',
      file: filename,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Something went wrong!',
      error,
    });
  }
});

module.exports = app;