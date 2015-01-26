var app = angular.module('beerme', ['ionic', 'ui.router'])


app.run(function($ionicPlatform) {
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

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: "templates/home.html"
    })

    .state('beers', {
      url: "/beers",
      templateUrl: "templates/beers.html"
    })


    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

  $urlRouterProvider.otherwise("/");

})


app.controller("MapCtrl", function($scope, $http, $ionicLoading) {
  
  $scope.data = {};
  $scope.zipCode = "0";
  $scope.lat = "0";
  $scope.lng = "0";
  $scope.beers = "";

  $scope.getBeersRoute = function(zipcode) {
    if (zipcode) {
      $scope.zipCode = zipcode
    };
    var response = $http.get("https://b33r-me.herokuapp.com/beers/"+$scope.zipCode);
    response.success(function(data) {
      $scope.beers = data
      console.log($scope.beers)
    })
  }

  $scope.getLocation = function () {
    console.log("Getting Current Location...")
    navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.failedReturn)
  }

  $scope.failedReturn = function() {
    console.log("Failed to return current location")
  }
 
  $scope.showPosition = function(position) {

    console.log("Getting zipcode....")
    $scope.lat = position.coords.latitude;
    $scope.lng = position.coords.longitude;
    $scope.$apply();

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var zipCode = new google.maps.Geocoder().geocode({'latLng': latlng}, function (res, status) {
      var zip = res[0].address_components[7].long_name;
      $scope.zipCode = zip
      console.log("Got the zipcode")
      $scope.getBeersRoute();
    })
  }

  $scope.getZipcode = function() {
    console.log('Get Zipcode Function Called')
    $scope.getLocation();
  }

});





