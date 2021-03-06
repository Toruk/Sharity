'use strict';

angular.module('mean.users').factory('MeanUser', ['$resource',
  function($resource) {
    return $resource('users/:username', {
      userName: '@name'
    }, {
      read: {
	method: 'GET'
      }
    }, {
      name: 'users'
    });
  }
]);
