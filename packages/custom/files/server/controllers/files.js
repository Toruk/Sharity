'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  File = mongoose.model('File'),
  _ = require('lodash'),
  fs = require('fs');


/**
 * Find file by name in a drive
 */

exports.fileName = function(req, res, next, fileName) {
  File
    .findOne({'drive': req.drive, 'name': fileName})
    .populate('user', 'username')
    .exec(function(err, file) {
      if (err) return next(err);
      if (!file) return next(new Error('Failed to load file ' + fileName));
      req.file = file;
      next();
    });
};

var filerm = function(file, cb) {
  if (file !== null) {
    file.remove(function(err) {
      if (err) {
        cb(err);
      }
      console.log('unlink of'+file.name);
      fs.unlink('./drives/'+file.drive+'/'+file.name, function (err) {
        if (err && err.code !== 'ENOENT')
          cb(err);
      });
      cb(null);
    });
  } else
    cb(null);
};

/**
 * Create a file after its upload in a temporary path
 */
exports.upload = function(req, res) {
  var drive = req.drive;

  var properties = {
    'name': req.files.file.originalname,
    'drive': drive
  };

  File.findOne(properties).exec(function(err, file) {
    filerm(file, function(err){
      file = new File(properties);
      file.user = req.user;

      // Move the file in its drive directory
      // mv /drives/tmpname /drives/:driveId/originalname
      console.log('rename of'+file.name);
      fs.rename(req.files.file.path, 'drives/' + drive._id + '/' + file.name, function(err) {
        if (err) {
          if (err.code === 'ENOENT') {
            return res.status(404).json({error: 'The drive folder does not exist'});
          } else {
            return res.status(500).json({error: 'Failed to save the file'});
          }
        }

        file.save(function(err) {
          if (err) {
            console.log('something went wrong: '+ err);
            filerm(file, function(err) {
              console.log('label err: '+err);
              // data was deleted
            });
            return res.status(500).json({
              error: err.type
            });
          }

          file.populate('user', 'username', function(err, file) {
            if (err)
            {
              console.log(err);
            }
            res.json(file);
          });
        });
      });
    });
  });
};

/**
 * Update an file
 *
exports.update = function(req, res) {
  var file = req.file;

  file = _.extend(file, req.body);

  file.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot update the file'
      });
    }
    res.json(file);
  });
};
*/

/**
 * Delete a file
 */
exports.destroy = function(req, res) {
  var file = req.file;

  filerm(file, function(err) {
    if (err && err.code !== 'ENOENT') {
      return res.status(500).json({
        error: 'Cannot delete the file'
      });
    }
    res.json(file);
  });
};

/**
 * Show a file
 */
exports.serve = function(req, res) {
  res.sendFile(req.drive._id+'/'+req.file.name, {root: './drives/'});
};

/**
 * List of Files of a drive
 */
exports.list = function(req, res) {
  File
    .find({'drive': req.drive})
    .sort('name')
    .populate('user', 'username')
    .exec(function(err, files) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the files'
      });
    }
    res.json(files);
  });
};

