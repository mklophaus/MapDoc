(function() {
 "use strict";

  angular
  .module("mapdocApp")
  .controller("SearchBoxController", SearchBoxController)
  .controller("ParameterController", ParameterController)

  .run(['$templateCache', function ($templateCache) {
    $templateCache.put('searchbox.tpl.html', '<input id="pac-input" ng-model="ngModel" class="pac-controls boldInput" type="text" placeholder="Search"></input>');
  }])

  .filter('searchForTitle', function(){
  return function(arr, searchTitle){

    if(!searchTitle){
      return arr;
    }

    var result = [];
    searchTitle = searchTitle.toLowerCase();

    angular.forEach(arr, function(item){
      if(item.title.toLowerCase().indexOf(searchTitle) !== -1){
        result.push(item);
      }
    });

    return result;
  };
  })

   .filter('searchForAuthor', function(){
  return function(arr, searchAuthor){

    if(!searchAuthor){
      return arr;
    }

    var result = [];
    searchAuthor = searchAuthor.toLowerCase();

    angular.forEach(arr, function(item){
      console.log(item);
      if(item.author.toLowerCase().indexOf(searchAuthor) !== -1){
        result.push(item);
      }
    });

    return result;
  };
  })

   .filter('searchForSubject', function(){
  return function(arr, searchSubject){

    if(!searchSubject){
      return arr;
    }

    var result = [];
    searchSubject = searchSubject.toLowerCase();

    angular.forEach(arr, function(item){
      console.log(item);
      if(item.subject.toLowerCase().indexOf(searchSubject) !== -1){
        result.push(item);
      }
    });

    return result;
  };
  });



  SearchBoxController.$inject = ["$scope", "$timeout", "$http", "$log", "uiGmapGoogleMapApi", "authService", "userDataService"];

  function SearchBoxController($scope, $timeout, $http, $log, uiGmapGoogleMapApi, authService, userDataService) {

    $('#searchSelection').change(function(){

      if ($(this).val() === '1') {
              $('#authorSearch').show();
              $('#titleSearch').hide();
              $('#subjectSearch').hide();
      }

      else if ($(this).val() == '2') {
              $('#subjectSearch').show();
              $('#authorSearch').hide();
              $('#titleSearch').hide();
      }

      else if ($(this).val() == '3') {
              $('#titleSearch').show();
              $('#authorSearch').hide();
              $('#subjectSearch').hide();
      }

    });

    var markers = [];
    var mapMarker;
    var mapMarkers = [];

    $scope.currentUser = userDataService.user;

    $scope.toggleMap = function () {
      $scope.searchbox.options.visible = !$scope.searchbox.options.visible;
    };


   $http.get('/docs').then(function(response){
      console.log(response.data[0]);
      angular.forEach(response.data, function(e){
          markers.push(e);
      });

    uiGmapGoogleMapApi.then(function(maps) {
      maps.visualRefresh = true;
      $scope.defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(35.82148, -118.66450),
        new google.maps.LatLng(35.66541, -118.31715)
        );

      $scope.map.bounds = {
        northeast: {
          latitude:$scope.defaultBounds.getNorthEast().lat(),
          longitude:$scope.defaultBounds.getNorthEast().lng()
        },
        southwest: {
          latitude:$scope.defaultBounds.getSouthWest().lat(),
          longitude:-$scope.defaultBounds.getSouthWest().lng()

        }
      };
      $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());

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

    angular.extend($scope, {
      map: {
        control: {},
        center: {
          latitude: 35.74349,
          longitude: -118.990822
        },
        zoom: 7,
        dragging: false,
        bounds: {},
        markers: [],
        idkey: 'place_id',
        events: {
        }
      },
      searchbox: {
        template: 'searchbox.tpl.html',
        // position:'top-left',
        options: {
          bounds: {},
          visible: true
        },
        //sets search box in right area
        parentdiv:'searchBoxParent',
        events: {
          places_changed: function (searchBox) {

            var searches = searchBox.getPlaces();

            var newMarkers = [];
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0, place; place = searches[i]; i++) {
              bounds.extend(place.geometry.location);
            }

            $scope.map.zoom = 5;
            $scope.map.bounds = {
              northeast: {
                latitude: bounds.getNorthEast().lat(),
                longitude: bounds.getNorthEast().lng()
              },
              southwest: {
                latitude: bounds.getSouthWest().lat(),
                longitude: bounds.getSouthWest().lng()
              }
            };

          }
        }
      }
    });

  }

  ParameterController.$inject = ["$scope", "$http"];

  function ParameterController($scope, $http){
    var documents = [];

      $http.get('/docs').then(function(response){
        angular.forEach(response.data, function(e){
          documents.push(e);
        });
      },
      function(err) {
          console.log('ERROR!', err);
      });

    $scope.items = documents;
  }

})();

