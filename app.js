angular.module('App', [])
   .controller('AppController', ['$scope', function($scope) {

   }])
   .controller('paises',['$scope', function($scope) {
    $scope.restcountries = [];
    fetch("https://restcountries.eu/rest/v2/all")
    .then(response => response.json())
    .then(result => {
        $scope.restcountries = result
        console.log($scope.restcountries);
    })
    .catch(error => console.log('error', error));
   }])