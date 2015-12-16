(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .controller("MainController", MainController);

  MainController.$inject = ["$scope", "$state", "$log"];

  function MainController($scope, $state, $log) {

    var vm = this;

    vm.welcomeMessage = "Welcome, User";

    vm.$state = $state;

    $scope.map = {
      center: {
        latitude:   34.04,
        longitude: -118.25
      },
      zoom: 12
    };



  }

})();
