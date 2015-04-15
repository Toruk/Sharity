'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Drive = mongoose.model('Drive'),
  _ = require('lodash');

/**
 * Find drive by id
 */
exports.drive = function(req, res, next, id) {
  Drive.load(id, function(err, drive) {
    if (err) return next(err);
    if (!drive) return next(new Error('Failed to load drive ' + id));
    req.drive = drive;
    next();
  });
};

/**
 * Create a drive
 */
exports.create = function(req, res) {
  var drive = new Drive(req.body);
  drive.users = drive.users || [];
  drive.users.push(req.user);

  console.log(req.body);

  drive.mkdir(function(err) {
    if (err) {
      if (err.code === 'ENOENT') {
        return res.status(500).json({error: 'The drive folder does not exist'});
      } else {
        console.log(err);
        return res.status(500).json({error: 'Cannot upload to the drive directory'});
      }
    }

    drive.save(function(err) {
      if (err) {
        return res.status(500).json({
          error: 'Cannot create the drive'
        });
      }
      res.json(drive);
    });
  });
};

/**
 * Update a drive
 */
exports.update = function(req, res) {
  var drive = req.drive;
  
  drive = _.extend(drive, req.body);
  console.log(req.body);
  drive.save(function(err) {
    if (err) {
      if (err.name === 'ValidationError') {
        return res.status(404).json( {
          users: err.errors.users.value
        });
      } else {
        console.log(err);
        return res.status(500).json({
          error: 'Cannot update the drive'
        });
      }
    }
    res.json(drive);
  });
};

/**
 * Delete a drive
 */
exports.destroy = function(req, res) {
  var drive = req.drive;

  drive.remove(function(err) {
    if (err) {
      return res.status(500).json({
	error: 'Cannot delete the drive'
      });
    }
    res.json(drive);
  });
};

/**
 * Show a drive
 */
exports.show = function(req, res) {
  res.json(req.drive);
};

/**
 * List of Drives
 */
exports.all = function(req, res) {
  Drive.find().sort('-created').populate('users', 'name username').exec(function(err, drives) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the drives'
      });
    }
    res.json(drives);

  });
};

