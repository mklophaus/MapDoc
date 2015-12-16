(function(){
  "use strict";

  angular
    .module("mapdocApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider"];

  function AppRoutes($stateProvider){

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "/templates/home.html"
      })
      .state("mapPage", {
        url: "/map",
        templateUrl: "/templates/map.html",
        controller: "MapController"
      })
      .state("aboutPage", {
        url: "/about",
        templateUrl: "/templates/about.html"
      })
      .state("post", {
        url: "/post",
        templateUrl: "/templates/post.html",
        controller: "DocsController",
        controllerAs: "vm"
      });
}

})();
