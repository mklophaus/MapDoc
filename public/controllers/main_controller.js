(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .controller("MainController", MainController);

  MainController.$inject = ["$scope", "$state", "$log", "userDataService", "authService"];

  function MainController($scope, $state, $log, userDataService, authService) {

    var vm = this;

    vm.currentUser = authService.currentUser;
    vm.logout = authService.logout;
    vm.isLoggedIn = authService.isLoggedIn;

    vm.userName = authService.userName;

    vm.welcomeMessage = "Welcome, User";

    vm.$state = $state;
  }

})();
