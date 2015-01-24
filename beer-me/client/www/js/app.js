// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('beerme', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('BeerMeCtrl', function($scope, $ionicModal) {
  $ionicModal.fromTemplateUrl('intro-page.html', function (modal) {
    $scope.introModal = modal;
  }, {
  scope: $scope,
  animation: 'slide-in-up'
  }
});

  $scope.generateBeerlist = function(task) {
    $scope.tasks.push({
      title: task.title
    });
  };
});

.controller('BeerlistCtrl', function($scope, $http){
  var url="routeToRAILSAPI/:zipcode";
  $http.get(url).success( function(response) {
    $scope.beers = response;
  })

}

.controller("MapCtrl", function($scope) {
  $scope.lat = "0";
  $scope.lng = "0";
  $scope.accuracy = "0";

  $scope.getLocation = function () {
    navigator.geolocation.getCurrentPosition($scope.showPosition)
  }
 
  $scope.showPosition = function(position) {
    $scope.lat = position.coords.latitude;
    $scope.lng = position.coords.longitude;
    $scope.accuracy = position.coords.accuracy;
    $scope.$apply();
    var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
    var zipCode = new google.maps.Geocoder().geocode({'latLng': latlng}, function (res, status) {
      var zip = res[0].address_components[7].long_name;
      console.log(zip)
    });
  }
  $scope.getLocation();
});






