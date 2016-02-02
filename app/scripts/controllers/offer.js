'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('OfferCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Ref, categories, notifications, $location) {


      console.log($routeParams.offerid);
      console.log($routeParams.requestid);

      var auth = Ref.getAuth();
      if (auth) {
         $scope.user = $firebaseObject(Ref.child('users').child(auth.uid));
         $scope.user.$loaded().then(function(user){
            $scope.request = $firebaseObject(Ref.child('request').child($routeParams.requestid));
            $scope.request.$loaded().then(function(request){

               $scope.org = $firebaseObject(Ref.child('organisation').child(request.requester));

               if($routeParams.offerid === 'new'){
                  $scope.offer = {
                     offerer: user.$id,
                     request: request.$id,
                     requester: request.requester,
                     requestTitle: request.title,
                     requestDescription : request.description,
                     timestamp: (new Date()).toString(),
                     description: '',
                     category: request.category,
                     accepted: false
                  };
               } else{
                  $scope.offer = $firebaseObject(Ref.child('offer').child($routeParams.offerid));
               }

            });
         });
      } else {
         $scope.user = {};
      }

      $scope.offers = $firebaseArray(Ref.child('offer'));

      $scope.updateOffer = function(){
         if($routeParams.offerid === 'new'){
            $scope.offers.$add($scope.offer);
            notifications.notifyOrg($scope.request.requester, {
              title: 'New offer (' + $scope.request.title + ')',
              icon: 'exclamation-sign',
              text: $scope.user.name || 'An anonymous user' + ' offered to "' + $scope.offer.description + '" in responce to your request for ' +  $scope.request.title + '.'
            });
         } else {
            $scope.offer.$save();
         }

         $location.url('/home');
      };
  });
