(function() {

  angular
    .module("mapdocApp", [
      "ui.router",
      "uiGmapgoogle-maps"    ])

    .config(function($httpProvider) {
  // attach our auth interceptor to the http requests
      $httpProvider.interceptors.push('authInterceptor');
    });


})();
