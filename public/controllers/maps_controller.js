// (function() {
//   "use strict";

//   angular
//     .module('mapdocApp', ['uiGmapgoogle-maps'])
//     .config(function(uiGmapGoogleMapApiProvider) {
//      uiGmapGoogleMapApiProvider.configure({
//       key: 'AIzaSyCnsYfPD49S9GzY7Cj7-6zATAkEdD9Tfxc'
//      });
//     })
//     .controller("MapController", MapController);



// function MapController(uiGmapGoogleMapApi){

//   var vm = this;

//   // Define variables for our Map object
//   var areaLat      = 44.2126995,
//       areaLng      = -100.2471641,
//       areaZoom     = 3;

//   uiGmapGoogleMapApi.then(function(maps) {
//     vm.map     = { center: { latitude: areaLat, longitude: areaLng }, zoom: areaZoom };
//     vm.options = { scrollwheel: false };
//   });
// }

// })();

