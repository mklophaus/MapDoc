(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .controller("MapController", MapController);

  MapController.$inject = ["$scope", "$state", "$log", "$http", "uiGmapGoogleMapApi", "authService"];

  function MapController($scope, $state, $log, $http, uiGmapGoogleMapApi, authService) {

    var vm = this;

    var mapLat, mapLng;

    var markers = [];
    var mapMarkers = [];
    var mapMarker;

    vm.userName = authService.currentUser.name;

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
                    url: m.fileUrl,
                    title: m.title,
                    subject: m.subject
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
        latitude:   28.463527,
        longitude: -1.868764
      },
      zoom: 2
    };


  };

})();
