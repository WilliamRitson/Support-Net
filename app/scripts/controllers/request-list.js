'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:RequestListCtrl
 * @description
 * # RequestListCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
	.controller('RequestListCtrl', function($scope, $routeParams, $firebaseObject, $firebaseArray, $location, Ref, categories) {
		var id = $routeParams.id;
		$scope.id = id;
		$scope.categories = categories.names;
		$scope.org = $firebaseObject(Ref.child('organisation').child(id));

    var query = Ref.child('request').orderByChild('requester').equalTo(id),
			requests = $firebaseArray(query);
		$scope.requests = requests;

		$scope.newItem = function() {
			requests.$add({
				requester: id,
        timestamp: (new Date()).toString(),
				title: '',
				description: '',
				category: $scope.categories[0]
			});
		};

		$scope.deleteItem = function(item) {
			//console.log('dltn', item.ref);
			requests.$remove(item).then(function(ref) {
				console.log(ref, item);
			}, function(e) {
				console.log(e);
			});
		};

		$scope.save = function() {
			requests.forEach(function(req) {
        requests.$save(req);
			});
		};

		$scope.done = function () {
			$scope.save();
			$location.url('/organisation/' + $scope.id);
		};
	});
