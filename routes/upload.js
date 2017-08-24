var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var debug = require('debug')('anti:upload');
var path = require('path');

/* GET users listing. */
router.post('/', function(req, res, next) {
  debug(res.headersSent);
  
  // create an incoming form object
  var form = new formidable.IncomingForm();
  
  // specify that we want to allow the user to upload multiple files
//  form.multiples = true;
  
  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '../file_uploads/');
  exportDir = path.join(__dirname, '../new_files/');
  
  // every time a file has been uploaded successfully,
  // rename it to it's original name
//  fs.rename(file.path, path.join(form.uploadDir, file.name));
  
  form.on('file', function(field, file) {
    debug('Field: ' + field + ', File: ' + file);
    
    fs.readFile(file.path, 'ascii', function(err, data) {
      if (err) {
        debug('Error reading file: ' + err);
        return next(err);
      }
      var newText = data.replace(/a/g, 'b');
      
      fs.writeFile(exportDir + file.name, newText, 'ascii', function(err) {
        if (err) debug('Error writing file: ' + err);
      });
    })
  });
  
  form.on('error', function(err) {
    debug('Error during file upload');
    debug(err);
  });
  
  form.on('end', function() {
    debug('Upload end!');
    res.json('Succcess message from server');
  })
  
  form.parse(req, function(err, fields, files) {
    debug('Parsing form!');
  });
  
//  res.json('something nasty happened');
});

module.exports = router;
