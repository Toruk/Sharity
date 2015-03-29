'use strict';

angular.module('mean.drives').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('drives root', {
      url: '/drives',
      templateUrl: 'drives/views/index.html'
    });
  }
]);
