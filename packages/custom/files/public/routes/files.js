'use strict';

angular.module('mean.files').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('file upload', {
      url: '/upload',
      templateUrl: 'files/views/upload.html'
    });
  }
]);
