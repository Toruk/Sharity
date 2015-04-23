'use strict';

//Files service used for drives REST endpoint
angular.module('mean.drives').factory('Files', ['$resource',
  function($resource) {
    return $resource('drives/:driveId/files/:fileName', {
        driveId: '@drive',
        fileName: '@name'
      }, {
        update: {
          method: 'PUT'
      }
    });
  }
]);

