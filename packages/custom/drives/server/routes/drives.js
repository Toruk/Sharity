'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Drives, app, auth, database) {

  app.get('/drives/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/drives/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/drives/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/drives/example/render', function(req, res, next) {
    Drives.render('index', {
      package: 'drives'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
