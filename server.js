const express = require('express');
const multer = require('multer');
const csvController = require('./controllers/csvController');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static('public'));

// Set up file upload using Multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('csvFile'), csvController.uploadCSV);
app.get('/files', csvController.listCSVFiles);
app.get('/data/:filename', csvController.getCSVData);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
