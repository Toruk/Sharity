'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * File Schema
 */
var FileSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    trim: true,
    required: true
  },
  drive: {  // parent drive
    type: Schema.ObjectId,
    ref: 'Drive',
    required: true,
  },
  user: { // user who uploaded the file
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  }
});

/**
 * Validations
 */
FileSchema.path('name').validate(function(name) {
  return !!name;
}, 'Name cannot be blank');

FileSchema.path('drive').validate(function(drive) {
  return !!drive;
}, 'Drive cannot be blank');

/**
 * Statics
 */
FileSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('File', FileSchema);

