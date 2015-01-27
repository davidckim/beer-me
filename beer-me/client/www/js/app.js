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

    .state("beer", {
      url: '/beers/beer',
      templateUrl: "templates/beer.html",
    })

    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

  $urlRouterProvider.otherwise("/");

})



app.service('MapService', function($q) {

  var zip = "";

  return {

    showZipCode: function() {
      return zip
    },

    getLocation: function() {
      console.log("first")
      var deferred = $q.defer();

      navigator.geolocation.getCurrentPosition(function(data) {
        deferred.resolve(data)
      }, function(err) {
        deferred.reject(err)
      })

      return deferred.promise;
    },

    showPosition: function(position) {
      console.log("finding zipcode.....")
      var deferred = $q.defer();

      var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      var zipCode = new google.maps.Geocoder().geocode({'latLng': latlng}, function (res, status) {
        zip = res[0].address_components[7].long_name;
        deferred.resolve(zip)
      })
      return deferred.promise
    },

    failedReturn: function() {
      console.log("Failed to return current location")
    }
  }
})


app.service('BeerService', function($http, MapService) {
  var beers = "";
  return {
    showBeers: function() {
      return beers
    },
    getBeersList: function() {
      console.log("im in the service beers")
      return $http.get("https://b33r-me.herokuapp.com/beers/"+MapService.zip).done(function(data) {
        beers = data
        console.log(beers)
      })
    }
  }
})


app.controller("MapCtrl", function($scope, $http, $ionicLoading, MapService, BeerService) {

  $scope.zipCode = "";
  $scope.beers = "";
  
  $scope.getLocation = function() {
    MapService.getLocation().then(MapService.showPosition).then(function(data) {
      $scope.zipCode = data;
      BeerService.getBeersList();
    })
  };

  $scope.getBeersList = function() {
    console.log("beers list")
    BeerService.showBeers().then(function(data) {
      console.log(data)
      $scope.beers = data
    })
  }

});





