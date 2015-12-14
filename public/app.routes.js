(function(){
  "use strict";

  angular
    .module("mapdocApp")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider"];

  function AppRoutes($stateProvider)
    $stateProvider
      .state("homePage", {
        url: "/",
        templateUrl: "/templates/home.html",
        controller: "HomeController",
        controllerAs: "vm"
      })
      .state("mapPage", {
        url: "/map",
        templateUrl: "/templates/map.html"
      })


})
