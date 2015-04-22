'use strict';

/* jshint -W098 */
angular
  .module('mean.files', [])
  .controller('FilesController', ['$scope', 'Global', 'Files',
    function($scope, Global, Files) {
      $scope.global = Global;
      $scope.package = {
        name: 'files'
      };
    }
  ]);


