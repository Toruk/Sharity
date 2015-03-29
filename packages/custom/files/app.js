'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Files = new Module('files');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Files.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Files.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Files.menus.add({
    title: 'Upload',
    link: 'file upload',
    roles: ['authenticated'],
    menu: 'main',
  });
  
  Files.aggregateAsset('css', 'files.css');

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Files.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Files.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Files.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Files;
});
