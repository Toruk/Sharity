'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  fs = require('fs'),
  Users = mongoose.models.User;

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

DriveSchema.path('users').validate(function(users, respond) {
  
  respond(true);
  /*
  Users
    .where('username')
    .in(users.map(function(user) { return user.username }))
    .exec(function (err, records) {
      for (user in records) {
        
      }
    });


  var name = users[0].username;
  var query = mongoose.models.User.where({ username: name });
  return query.findOne(function (err, user) {
    if (!user) {
      console.log('invalid user');
      respond(false);
    } else {
      console.log('valid user');
      respond(true);
    }
  });*/
  // mongoose.models.User.findByName(name, function(err, user) {
  //   console.log('user: '+user);
  //   res = user ? true : false;
  //   return res;
  // });
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
};

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

