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

    .state('about', {
      url: '/about',
      templateUrl: 'templates/about.html'
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
      }, { enableHighAccuracy: true })

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
    getBeersList: function(zipcode) {
      console.log("im in the service beers")
      return $http.get("https://b33r-me.herokuapp.com/beers/"+zipcode).success(function(data) {
        return data
      })
    }
  }
})


app.controller("MapCtrl", function($scope, $http, $ionicLoading, $state, $ionicPopup, MapService, BeerService) {

  $scope.data = {};
  $scope.zipCode = "";
  $scope.beers = "";
  $scope.beerObject = "";
  $scope.beerBars = "";

  $scope.showBeerPage = function(beerObj) {
    $scope.beerObject = beerObj
    $scope.beerBars = beerObj.locations
    console.log($scope.beerObject)
    console.log($scope.beerBars)
    $state.go('beer');
  }

  $scope.getBeersByZipCode = function() {
    $ionicLoading.show({
      template: '<div style="width: 100%; background-color: #E8BD1B "><img src="../img/beerLoading.gif" width="100%" style="margin-top: 50%; margin-bottom: 50%"></div>'
    });

    BeerService.getBeersList($scope.data.zipCode).then(function(response) {
      $scope.beers = response.data
      console.log($scope.beers)
      $ionicLoading.hide();
      $state.go('beers');
    })
  }
  
  $scope.getLocation = function() {
    $ionicLoading.show({
        template: '<div style="width: 100%; background-color: #E8BD1B "><img src="../img/beerLoading.gif" width="100%" style="margin-top: 50%; margin-bottom: 50%"></div>'
    });

    MapService.getLocation().then(MapService.showPosition).then(function(data) {
      $scope.zipCode = data;
      console.log(data)
      BeerService.getBeersList($scope.zipCode).then(function(response) {
        $scope.beers = response.data
        console.log($scope.beers)
        $ionicLoading.hide();
        $state.go('beers');
      })
    })
  };

  $scope.zipcodePop = function() {
    $ionicPopup.show({
      template: '<input type="text" ng-model="data.zipCode" maxlength="5">',
      title: 'Please enter a zipcode',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        { text: '<b>Submit</b>',
          type: 'button-energized',
          onTap: $scope.getBeersByZipCode
        }
      ]
    })
  }

  $scope.selectMe = function(event) {
    $(event.target).addClass('button-opacity')
  }



});





