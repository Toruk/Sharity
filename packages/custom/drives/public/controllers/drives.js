'use strict';

/* jshint -W098 */
angular.module('mean.drives').controller('DrivesController', ['$scope', '$stateParams', '$location', 'Global', 'Drives',
  function($scope, $stateParams, $location, Global, Drives) {
    $scope.package = {
      name: 'drives'
    };
    $scope.global = Global;
    $scope.hasAuthorization = function(drive) {
      if (!drive || !drive.users) return false;
      return $scope.global.isAdmin || drive.users.indexOf($scope.global.user._id) !== -1;
    };

    $scope.create = function(isValid) {
      if (isValid) {
	var drive = new Drives({
	  name: this.name,
	  public: this.public,
	  users: this.users
	});
	drive.$save(function(response) {
	  $location.path('drives/' + response._id);
	});

	this.name = '';
	this.public = false;
	this.users = [];
      } else {
	$scope.submitted = true;
      }
    };

    $scope.find = function() {
      Drives.query(function(drives) {
        $scope.drives = drives;
      });
    };

    $scope.findOne = function() {
      Drives.get({
	driveId: $stateParams.driveId
      }, function(drive) {
	$scope.drive = drive;
      });
    };
  }
]);
