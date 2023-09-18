const fs = require('fs');
const path = require('path');
const csvtojson = require('csvtojson');

const csvFilePath = path.join(__dirname, 'csvdirectory', 'nodejs-hw1-ex1.csv');
const txtFilePath = path.join(__dirname, 'output.txt');

const writeStream = fs.createWriteStream(txtFilePath, { flags: 'w' });

writeStream.on('error', (err) => {
  console.error('Error writing:', err);
});

writeStream.on('finish', () => {
  console.log('CSV data converted and written to output.txt');
});

csvtojson()
  .fromFile(csvFilePath)
  .subscribe((jsonObj) => {
    const formattedJson = `{"book":"${jsonObj.Book}","author":"${jsonObj.Author}","price":${parseFloat(jsonObj.Price)}}\n`;

    writeStream.write(formattedJson);
  }, (err) => {
    console.error('Error converting CSV to JSON:', err);
  }, () => {
    writeStream.end();
  });