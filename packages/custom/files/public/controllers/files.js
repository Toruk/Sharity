'use strict';

/* jshint -W098 */
angular
  .module('mean.files', [])
  .controller('FilesController', ['$scope', '$filter', 'Global', '$stateParams', '$location', 'Files',
  function($scope, $filter, Global, $stateParams, $location, Files) {
    $scope.global = Global;
    $scope.package = {
      name: 'files'
    };
    
    $scope.isOwner = function(file) {
      if (!file)
        return false;

      return true;
    };

    $scope.remove = function(file) {
      if (file) {
        file.$remove(function(response) {
          for (var i in $scope.files) {
            if ($scope.files[i] === file) {
              $scope.files.splice(i, 1);
            }
          }
          $location.path('drives/'+$stateParams.driveId);
        });
      }
    };

    $scope.bindFilesList = function() {
      Files.query({driveId : $stateParams.driveId}, function(files) {
        $scope.files = files;
        $filter('orderBy')($scope.files, '-name', false);
      });
      $scope.uploader.onCompleteItem = function(fileItem, response, status, headers) {
        $scope.bindFilesList();
      };
    };

  }
]);

