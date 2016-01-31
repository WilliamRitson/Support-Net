'use strict';

/**
 * @ngdoc function
 * @name hackucscApp.controller:OfferCtrl
 * @description
 * # OfferCtrl
 * Controller of the hackucscApp
 */
angular.module('hackucscApp')
  .controller('OfferCtrl', function ($scope, $routeParams, $firebaseObject, $firebaseArray, Ref, categories, $location) {

      /*$scope.offers.$add({
         offerer: $scope.user.$id,
         request: request.$id,
         requester: request.requester,
         requestTitle: request.title,
         requestDescription : request.description,
         timestamp: (new Date()).toString(),
         description: '',
         category: request.category,
         accepted: false
      }).then(function(ref){
         $firebaseObject(ref).$loaded().then(function(offer){
            $location.url("/offer/" + offer.$id);
         })
      });*/

      console.log($routeParams.offerid);
      console.log($routeParams.requestid);      

      var auth = Ref.getAuth();
      if (auth) {
         $scope.user = $firebaseObject(Ref.child('users').child(auth.uid));
         $scope.user.$loaded().then(function(user){
            $scope.request = $firebaseObject(Ref.child("request").child($routeParams.requestid));
            $scope.request.$loaded().then(function(request){
               
               $scope.org = $firebaseObject(Ref.child("organisation").child(request.requester));

               if($routeParams.offerid === "new"){
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
                  $scope.offer = $firebaseObject(Ref.child("offer").child($routeParams.offerid));
               }

            });
         });
      } else {
         $scope.user = {};
      }

      $scope.offers = $firebaseArray(Ref.child("offer"));

      /*
      $scope.matchingRequest = $firebaseObject(Ref.child("request").child($routeParams.id))
      $scope.matchingRequest.$loaded().then(function(request){
         console.log($scope.user.$id);
         console.log(request);
         $scope.org = $firebaseObject(Ref.child("organisation").child(request.requester));

         $scope.currentOffers = $firebaseArray(Ref.child('offer').orderByChild("offerer").equalTo($scope.user.$id));
         $scope.currentOffers.$loaded().then(function(currentOffers) {
            console.log(currentOffers);

            function isMatching(thisOffer){
               return (thisOffer.request === request.$id);
            }

            $scope.offer = currentOffers.find(isMatching) || {
               offerer: $scope.user.$id,
               request: request.$id,
               requester: request.requester,
               requestTitle: request.title,
               requestDescription : request.description,
               timestamp: (new Date()).toString(),
               description: '',
               category: request.category,
               accepted: false
            };
            console.log($scope.offer);
         });
      });*/

      $scope.updateOffer = function(){
         if($routeParams.offerid === "new"){
            $scope.offers.$add($scope.offer);
         } else {
            console.log($scope.offer);
            $scope.offer.$save();
         }

         $location.url("/home");
      };
  });
