'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  File = mongoose.model('File'),
  _ = require('lodash'),
  fs = require('fs');


/**
 * Find file by id
 */
exports.file = function(req, res, next, id) {
  File.load(id, function(err, file) {
    if (err) return next(err);
    if (!file) return next(new Error('Failed to load file ' + id));
    req.file = file;
    next();
  });
};

/**
 * Create a file after its upload
 */
exports.create = function(req, res) {
  var drive = req.drive;
  var file = new File({
    name: req.files.file.originalname,
    drive: drive,
    user: req.user,
  });
  console.log(file);

  // mv /drives/tmpname /drives/:driveId/originalname
  fs.rename(req.files.file.path, 'drives/' + drive._id + '/' + req.files.file.originalname, function(err) {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(500).json({error: 'The drive folder does not exist'});
      } else {
        return res.status(500).json({error: 'Failed to save the file'});
      }
    }

    file.save(function(err) {
      if (err) {
        return res.status(500).json({
          error: err.type
        });
      }
      res.json(file);
    });
  });
};

/**
 * Update an file
 */
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

/**
 * Delete a file
 */
exports.destroy = function(req, res) {
  var file = req.file;

  file.remove(function(err) {
    if (err) {
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
exports.show = function(req, res) {
  res.json(req.file);
};

/**
 * List of Files
 */
exports.all = function(req, res) {
  File.find().sort('-created').populate('user', 'name username').exec(function(err, files) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the files'
      });
    }
    res.json(files);
  });
};

