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
    
    $scope.hasAuthorization = function(file) {
      if (!file)
        return false;

      return true;
      //return $scope.global.isAdmin || (file.user._id === $scope.global.user._id);
      // return file.public || $scope.global.isAdmin || isUserAuthorized();
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

