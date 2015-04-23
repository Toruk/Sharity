'use strict';

var drives = require('../../../drives/server/controllers/drives');
var files = require('../controllers/files');


// Drive authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.drive.hasAuthorization(req.user)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};


/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Files, app, auth, database) {

  app.route('/drives/:driveId/files')
    .get(auth.requiresLogin, files.list)
    .post(auth.requiresLogin, files.upload);
  app.route('/drives/:driveId/files/:fileName')
    .get(auth.requiresLogin, hasAuthorization, files.serve)
    //.put(auth.requiresLogin, hasAuthorization. files.update)
    .delete(auth.requiresLogin, hasAuthorization, files.destroy);

  app.param('driveId', drives.drive);
  app.param('fileName', files.fileName);
};

