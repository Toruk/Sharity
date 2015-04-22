'use strict';

angular.module('mean.search').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('Search', {
      url: '/search',
      templateUrl: 'search/views/index.html'
    });
  }
]);
