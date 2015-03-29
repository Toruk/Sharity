'use strict';

/* jshint -W098 */
angular.module('mean.drives').controller('DrivesController', ['$scope', 'Global', 'Drives',
  function($scope, Global, Drives) {
    $scope.global = Global;
    $scope.package = {
      name: 'drives'
    };
  }
]);
