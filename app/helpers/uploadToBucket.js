const { Storage } = require('@google-cloud/storage');
const path = require('path');

const uploadToCloudBucket = (file) => {
  try {
    if (!file) return { status: 400, message: 'No file uploaded.' };

    const storage = new Storage({
      projectId: process.env.GCLOUD_PROJECT_ID,
      credentials: require(path.join(__dirname, '../api/config/gcloud-credentials.js')),
    });

    const bucketName = process.env.GCLOUD_STORAGE_BUCKET;
    const randomFileName = `${Date.now().toString()}${file.originalname}`;

    file.filename = randomFileName;

    const bucket = storage.bucket(bucketName);
    const blob = bucket.file(file.filename);
    const blobStream = blob.createWriteStream();

    blobStream.on('finish', () => {
      return {
        status: 200,
        message: 'File uploaded successfully!',
      };
    });

    blobStream.end(file.buffer);
  } catch (error) {
    console.log(error);
    return { status: 500, message: 'Internal server error.' };
  }
};

module.exports = uploadToCloudBucket;