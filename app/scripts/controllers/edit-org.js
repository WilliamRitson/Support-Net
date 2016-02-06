'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:EditOrgCtrl
 * @description
 * # EditOrgCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
	.controller('EditOrgCtrl', function($scope, $routeParams, $location, $firebaseObject, Ref) {
		var orgs = $firebaseObject(Ref.child('organisation')),
			user = $firebaseObject(Ref.child('users').child(Ref.getAuth().uid));

		var loadOrg = function() {
			var id = $routeParams.id;

			if (id === 'new') {
				$scope.org = {
					name: '',
					description: '',
					dropOff: '',
					users: {}
				};
				$scope.org.users[user.$id] = true;
			} else {
				$scope.org = $firebaseObject(Ref.child('organisation').child(id));
			}
		};
		loadOrg();

		var save = function() {
			if ($routeParams.id === 'new') {
				if ($scope.okName($scope.org.name)) {
					var newOrg = $firebaseObject(Ref.child('organisation').child($scope.org.name));
					newOrg.name = $scope.org.name;
					newOrg.description = $scope.org.description;
					newOrg.dropOff = $scope.org.dropOff;
					newOrg.users = $scope.org.users;
					newOrg.$save();
					//orgs[$scope.org.name] = $scope.org;
					//orgs.$save();
					user.orgs = (user.orgs || []).concat([$scope.org.name]);
					user.$save();
				}
			} else {
				$scope.org.$save();
			}
		};

		$scope.okName = function(name) {
			return name !== '' && !orgs[name] || (!user.orgs || user.orgs.indexOf(name) !== -1);
		};

		$scope.done = function() {
			save();
			$location.url('/organisation/' + $scope.org.name);
		};


	});
