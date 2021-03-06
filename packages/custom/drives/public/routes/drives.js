'use strict';

angular.module('mean.drives').config([
  '$stateProvider',
  function($stateProvider) {
    var checkLoggedIn = function($q, $timeout, $http, $location) {
      var deferred = $q.defer();
      
      $http.get('/loggedin').success(function(user) {
        if (user !== '0')
          $timeout(deferred.resolve);
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });
      
      return deferred.promise;
    };

    $stateProvider
      .state('drives root', {
        url: '/drives',
        templateUrl: 'drives/views/list.html',
        resolve: {
          loggedin: checkLoggedIn
        }
      })
      .state('public drives', {
        url: '/drives/public',
        templateUrl: 'drives/views/public.html'
      })
      .state('create drive', {
        url: '/drives/create',
        templateUrl: 'drives/views/create.html',
        resolve: {
          loggedin: checkLoggedIn
        }
      })
      .state('edit drive', {
        url: '/drives/:driveId/edit',
        templateUrl: 'drives/views/edit.html',
        resolve: {
          loggedin: checkLoggedIn
        }
      })
      .state('upload on drive', {
        url: '/drives/:driveId/upload',
        templateUrl: 'drives/views/upload.html',
        resolve: {
          loggedin: checkLoggedIn
        }	
      })
      .state('drive by id', {
        url: '/drives/:driveId',
        templateUrl: 'drives/views/view.html',
        resolve: {
          loggedin: checkLoggedIn,
        }
      });
  }
]);

