(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .config(loadGoogleMapsSDK);

  loadGoogleMapsSDK.$inject = ["uiGmapGoogleMapApiProvider"];

  function loadGoogleMapsSDK(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyCnsYfPD49S9GzY7Cj7-6zATAkEdD9Tfxc',
      v: '3.20',  //defaults to latest 3.X anyhow
      libraries: 'weather,geometry,visualization'
    });
  }

})();
