(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .controller("MainController", MainController);

  MainController.$inject = ["$scope", "$state", "$log", "userDataService", "authService"];

  function MainController($scope, $state, $log, userDataService, authService) {
    var vm = this;

    $scope.currentUser = userDataService.user;

    vm.logout = authService.logout;
    vm.isLoggedIn = authService.isLoggedIn;

     vm.$state = $state;
  }

})();
