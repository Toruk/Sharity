'use strict';

var drives = require('../../../drives/server/controllers/drives');
var files = require('../controllers/files');

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Files, app, auth, database) {

  app.route('/drives/:driveId/files')
    .get(files.all)
    .post(files.create);
  app.route('/drives/:driveId/files/:fileId')
    .get(auth.isMongoId, files.show)
    .put(auth.isMongoId, auth.requiresLogin, files.update)
    .delete(files.destroy);

  app.param('driveId', drives.drive);
  app.param('fileId', files.file);

};
