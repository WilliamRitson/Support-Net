'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:RequestListCtrl
 * @description
 * # RequestListCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
	.controller('RequestListCtrl', function($scope, $routeParams, $firebaseObject, $firebaseArray, Ref, categories) {
		var id = $routeParams.id;
		$scope.id = id;
		$scope.categories = categories.names;
		var query = Ref.child('request').orderByChild('requester').equalTo(id).limitToLast(10),
			requests = $firebaseArray(query);
		$scope.org = $firebaseObject(Ref.child('organisation').child(id));
		console.log(requests);
		$scope.requests = requests;

		/*
		Ref.child('request').orderByChild('requester').equalTo(id).on('value', function(data) {
			$scope.requests = [];
			data.forEach(function(d) {
				var next = d.val();
				next.ref = d.ref();
				$scope.requests.push(next);
			});
		});
    */



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
	});
