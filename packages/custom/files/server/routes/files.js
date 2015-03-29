'use strict';

/* jshint -W098 */
// The Package is past automatically as first parameter
module.exports = function(Files, app, auth, database) {

  app.get('/files/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/files/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/files/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/files/example/render', function(req, res, next) {
    Files.render('index', {
      package: 'files'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
