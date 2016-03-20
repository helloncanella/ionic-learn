angular.module('starter.controllers', [])

.controller('ReservationController',['$scope', function($scope){
  $scope.reservation = {
    checkin: new Date(),
    checkout: new Date(Date.now() + 1000*60*60*24*7),
    room: 156,
    rate: 121,
    wifi: 'resortwifi',
  };
}])

.controller('WeatherController', function ($scope, $http, $ionicLoading) {
  var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  $ionicLoading.show();
  $http.get('http://api.openweathermap.org/data/2.5/weather?q=london,uk&units=metric&APPID=5c8eba3fdb8e4ee5dab30e40b4e59951').success(function (weather) {
    $scope.weather = weather;
    $ionicLoading.hide();
  }).error(function (err) {
    $ionicLoading.show({
      template: 'Could not load weather. Please try again later.',
      duration: 3000
    });
  });

  $scope.getDirection = function (degree) {
    if (degree > 338) {
      degree = 360 - degree;
    }
    var index = Math.floor((degree + 22) / 45);
    return directions[index];
  };
})

.controller('RestaurantsController', ['$scope', '$http', function ($scope, $http) {

  $scope.page = 0;
  $scope.total = 1;
  $scope.restaurants = [];

  $scope.getRestaurants = function () {
    $scope.page++;
    $http.get('https://ionic-in-action-api.herokuapp.com/restaurants?page=' + $scope.page).success(function (response) {
      angular.forEach(response.restaurants, function (restaurant) {
        $scope.restaurants.push(restaurant);
      });
      $scope.total = response.totalPages;
      $scope.$broadcast('scroll.infiniteScrollComplete');
    }).error(function (err) {
      $scope.$broadcast('scroll.infiniteScrollComplete');
      console.log(err);
    });
  };

  $scope.getRestaurants();
}])

;
