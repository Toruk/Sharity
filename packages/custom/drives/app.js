'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Drives = new Module('drives');

var multer  = require('multer');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Drives.register(function(app, auth, database) {


  Drives.aggregateAsset('css', 'drives.css');
  Drives.angularDependencies(['angular-file-upload', 'ng-tags-input']);

  //We are adding a link to the main menu for all authenticated users
  Drives.menus.add({
    title: 'My Drives',
    link: 'drives root',
    roles: ['authenticated'],
    menu: 'main',
  });
  Drives.menus.add({
    title: 'Public Drives',
    link: 'public drives',
    roles: ['all']
  });
  
  app.use(multer({ dest: './drives/',
    rename: function (fieldname, filename) {
      return filename+Date.now();
    },
    onFileUploadStart: function (file) {
      console.log(file.originalname + ' is starting ...');
    },
    onFileUploadComplete: function (file) {
      console.log(file.fieldname + ' uploaded to  ' + file.path);
    }
  }));

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Drives.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Drives.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Drives.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  //We enable routing. By default the Package Object is passed to the routes
  Drives.routes(app, auth, database);


  return Drives;
});
