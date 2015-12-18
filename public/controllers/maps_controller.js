(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .controller("MapController", MapController);

  MapController.$inject = ["$scope", "$state", "$log", "$http", "uiGmapGoogleMapApi"];

  function MapController($scope, $state, $log, $http, uiGmapGoogleMapApi) {

    var vm = this;

    var mapLat, mapLng;

    var markers = [];
    var mapMarkers = [];
    var mapMarker;

    vm.welcomeMessage = "Welcome, User";

    vm.$state = $state;

    $http.get('/docs').then(function(response){
        console.log(response.data[0]);
        angular.forEach(response.data, function(e){
            markers.push(e);
        });

        uiGmapGoogleMapApi.then(function(maps) {
            var i = 0;
            markers.forEach(function(m){
                mapMarker = {
                    latitude: m.latitude,
                    longitude: m.longitude,
                    id: i,
                    title: m.fileUrl
                };
                mapMarkers.push(mapMarker);
                i++;
            });
        $scope.markers = mapMarkers;

        });
    },
    function(err) {
        console.log('ERROR!', err);
    });

    $scope.map = {
      center: {
        latitude:   34.04,
        longitude: -118.25
      },
      zoom: 5
    };


  };

})();
