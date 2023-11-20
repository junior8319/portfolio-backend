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
const app = express();

app.use(express.json()); // parse json bodies
app.use(cors()); // allow all origins

app.use('/stacks', stacksRouter);
app.use('/projects', projectsRouter);
app.use('/stacks-projects', stacksProjectsRouter);
app.use('/users', loginRouter);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/src/assets/images');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now().toString()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('snapshot'), (req, res) => {
  return res.status(200).json({
    message: 'File uploaded successfully',
    file: req.file,
  });
});

app.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, `../../../frontend/src/assets/images/${filename}`);

  return res.sendFile(imagePath);
});

app.delete('/files/delete/:filename', (req, res) => {
  const { filename } = req.params;

  if (fs.existsSync(
    path.join(__dirname, `../../../frontend/src/assets/images/${filename}`)
  )) {
    fs.unlinkSync(path.join(__dirname, `../../../frontend/src/assets/images/${filename}`));

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