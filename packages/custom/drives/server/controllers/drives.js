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
  drive.users.push(req.user);

  drive.save(function(err) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot create the drive'
      });
    }
    res.json(drive);
  });
};

/**
 * Show an drive
 */
exports.show = function(req, res) {
  res.json(req.drive);
};

/**
 * List of Drives
 */
exports.all = function(req, res) {
  Drive.find().sort('-created').populate('user', 'name username').exec(function(err, drives) {
    if (err) {
      return res.status(500).json({
        error: 'Cannot list the drives'
      });
    }
    res.json(drives);

  });
};
