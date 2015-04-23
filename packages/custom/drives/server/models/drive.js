'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  fs = require('fs');

/**
 * Drive Schema
 */
var DriveSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  public: {
    type: Boolean,
  },
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
    }).populate('created_by', 'name username').populate('users', 'name username').exec(cb);
  }
};

DriveSchema.methods.hasAuthorization = function(user) {
  if (this.created_by.id == user.id || this.users.indexOf(user._id) > -1)
    return true;
  return false;
}

DriveSchema.methods.mkdir = function(cb) {
  // mkdir -p drive_root
  try {
    fs.mkdirSync('drives/'+this._id);
  } catch(e) {
    if ( e.code !== 'EEXIST' ) {
      console.log(e);
      cb(e);
    }
  }
  cb(null);
};

mongoose.model('Drive', DriveSchema);

