const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const uploadsDirectory = './uploads/';

function listCSVFiles(req, res) {
  fs.readdir(uploadsDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Could not list files' });
    }

    const csvFiles = files.filter(file => path.extname(file) === '.csv');
    res.json({msg:'csv get successfully',csvFiles});
  });
}

function getCSVData(req, res) {
  const filename = req.params.filename;
  const filePath = path.join(uploadsDirectory, filename);

  const results = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', data => results.push(data))
    .on('end', () => {
      res.json(results);
    });
}

function uploadCSV(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  res.json({ message: 'File uploaded successfully' });
}

module.exports = {
  listCSVFiles,
  getCSVData,
  uploadCSV,
};
