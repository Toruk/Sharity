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
  public: {
    type: Boolean,
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

DriveSchema.path('users').validate(function(users) {
  // Check if user is in db
  return true;
}, 'Username must be valid');

/**
 * Statics
 */
DriveSchema.statics.load = function(id, cb) {
  if (mongoose.Types.ObjectId.isValid(id))
  {
    this.findOne({
      _id: id
    }).populate('users', 'name username').exec(cb);
  }
  else
  {
    console.log('404!!');
  }
};

mongoose.model('Drive', DriveSchema);
