'use strict';

var drives = require('../controllers/drives');

// Drive authorization helpers
var hasAuthorization = function(req, res, next) {
  console.log('alo');
  console.log(req.drive);
  if (!(req.user.isAdmin || req.drive.created_by.id !== req.user.id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Drives, app, auth, database) {

  app.route('/drives')
    .get(drives.all)
    .post(auth.requiresLogin, drives.create);

  app.route('/drives/:driveId')
    .get(auth.isMongoId, drives.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, drives.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, drives.destroy);

  //Setting up the driveId param
  app.param('driveId', drives.drive);
};
