'use strict';

//Drives service used for drives REST endpoint
angular.module('mean.drives').factory('Drives', ['$resource',
  function($resource) {
    return $resource('drives/:driveId', {
      driveId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

