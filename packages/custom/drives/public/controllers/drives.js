'use strict';

/* jshint -W098 */
angular
  .module('mean.drives', ['angularFileUpload', 'ngTagsInput'])
  .controller('DrivesController', ['$http', '$scope', '$stateParams', '$location', 'Global', 'Drives', 'FileUploader',
  function($http, $scope, $stateParams, $location, Global, Drives, FileUploader) {
    $scope.package = {
      name: 'drives'
    };
    
    $scope.global = Global;

    $scope.hasAuthorization = function(drive) {
      if (!drive)
        return false;

      function isUserAuthorized() {
        console.log("is user authorized ?");
        console.log(drive);
        if (drive.created_by._id === $scope.global.user._id)
          return true;
        return false;
      }

      return $scope.global.isAdmin || (drive.created_by._id === $scope.global.user._id);
      // return drive.public || $scope.global.isAdmin || isUserAuthorized();
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
        console.log(this);
        this.name = '';
        this.public = false;
        this.users = [];
      } else {
        $scope.submitted = true;
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var drive = $scope.drive;
        if (!drive.updated) {
          drive.updated = [];
        }
        drive.updated.push(new Date().getTime());
        if (drive.public) {
          drive.users = [];
        }
        $scope.submitted = true;
        drive.$update(function(response) {
          console.log('update response:'+JSON.stringify(response));
          $location.path('drives/' + drive._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(drive) {
      if (drive) {
        drive.$remove(function(response) {
          for (var i in $scope.drives) {
            if ($scope.drives[i] === drive) {
              $scope.drives.splice(i, 1);
            }
          }
          $location.path('drives');
        });
      }
    };

    $scope.find = function() {
      Drives.query(function(drives) {
        $scope.drives = drives;
      });
    };

    $scope.findPublic = function() {
      $http.get('/drives/public')
        .success(function(drives) {
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

    $scope.autocompleteUser = function(query) {
      return $http.get('/users/search/'+query);
    };


    var uploader = $scope.uploader = new FileUploader({
      url: '/drives/'+$stateParams.driveId+'/files',
    });
    uploader.queue.limit = 15;

// FILTERS
    uploader.filters.push({
      name: 'CustomFilter',
      fn: function(item, options) {
        return this.queue.length < this.queue.limit;
      }
    });

// CALLBACKS
uploader.onWhenAddingFileFailed = function(item, filter, options) {
  console.info('onWhenAddingFileFailed', item, filter, options);
};
uploader.onAfterAddingFile = function(fileItem) {
console.info('onAfterAddingFile', fileItem);
};
uploader.onAfterAddingAll = function(addedFileItems) {
console.info('onAfterAddingAll', addedFileItems);
};
uploader.onBeforeUploadItem = function(item) {
console.info('onBeforeUploadItem', item);
};
uploader.onProgressItem = function(fileItem, progress) {
console.info('onProgressItem', fileItem, progress);
};
uploader.onProgressAll = function(progress) {
console.info('onProgressAll', progress);
};
uploader.onSuccessItem = function(fileItem, response, status, headers) {
console.info('onSuccessItem', fileItem, response, status, headers);
};
uploader.onErrorItem = function(fileItem, response, status, headers) {
console.info('onErrorItem', fileItem, response, status, headers);
};
uploader.onCancelItem = function(fileItem, response, status, headers) {
console.info('onCancelItem', fileItem, response, status, headers);
};
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
      console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
      console.info('onCompleteAll');
    };
    
  }
]);
