(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .controller("MapController", MapController);

  MapController.$inject = ["$scope", "$state", "$log", "$http", "uiGmapGoogleMapApi"];

  function MapController($scope, $state, $log, $http, uiGmapGoogleMapApi) {

    var vm = this;

    var markers = [];

    vm.welcomeMessage = "Welcome, User";

    vm.$state = $state;

    $http.get('/docs').then(function(response){
        console.log(response.data[0]);
        angular.forEach(response.data, function(e){
            markers.push(e);
        });
        console.log("MARKERS");
        console.log(markers);
    },
    function(err) {
        console.log('ERROR!', err);
    });


    $scope.map = {
      center: {
        latitude:   34.04,
        longitude: -118.25
      },
      zoom: 12
    };


    var stringAddress = "Los Angeles";

        // geocode the given address
    var geocodeAddress = function(address, callback) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location);
            } else {
                console.log("Geocode was not successful for the following reason: " + status);
            }
        });
    };

    // google maps is ready
    uiGmapGoogleMapApi.then(function(maps) {
        // geocode chosen town
        geocodeAddress(stringAddress, function(latLng){
            console.log("1  " + latLng.lat());
            console.log("2  " + latLng.lng());

            $scope.$apply(function() {
               // $scope.map = { center: { latitude: latLng.lat(), longitude: latLng.lng() }, zoom: 12, bounds: {}};
                $scope.marker = {
                    id: 1,
                    coords: {
                        latitude: latLng.lat(),
                        longitude: latLng.lng()
                    },
                    options: {
                        draggable: false
                    }
                };
            });

        });



    });






    // var marker1 = {id: 1, latitude: 34.7699298, longitude: -118.40};
    // var marker2 = {id: 2, latitude: 34.7699298, longitude: -118.45};
    // var marker3 = {id: 3, latitude: 34.7699298, longitude: -118.46};
    // $scope.markers = [];
    // $scope.markers[0] = marker1;
    // $scope.markers[1] = marker2;
    // $scope.markers[2] = marker3;
    //     // vm.getDocs = getDocs;

    // vm.getDocs();

    // function getDocs() {
    //   $http.get('/docs').then(function(response) {
    //     console.log(response);
    //     vm.docs = response.data;
    //   }, function(err) {
    //     console.error('Error!', err);
    //   });
    // }




  };

})();
