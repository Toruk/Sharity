'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Drive Schema
 */
var DriveSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  files: [{
    type: Schema.ObjectId,
    ref: 'File',
  }],
  users: [{
    type: Schema.ObjectId,
    ref: 'User'
  }]
});

/**
 * Validations
 */
DriveSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

/**
 * Statics
 */
DriveSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Drive', DriveSchema);
