'use strict';

angular.module('mean.users').directive('userExists', function ($q, $timeout, $http) {
  return {
    require:'ngModel',
    restrict:'A',
    link: function (scope, el, attrs, ctrl) {
      ctrl.$asyncValidators.userExists = function(value) {
        console.log('users directive');
	if (ctrl.$isEmpty(value)) return $q.when();
	var def = $q.defer();
	$http.get('/users/' + value)
	  .success(function() {
	    // User does exist
	    ctrl.$setValidity('userExists', true);
	    def.resolve();
	  })
	  .error(function() {
	    ctrl.$setValidity('userExists', false);
	    def.reject();
	  });

	return def.promise();
      };
    }
  };
});
