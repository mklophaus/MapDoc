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





    vm.login      = login;
    vm.isLoggedIn = authService.isLoggedIn;
    vm.currentUser = userDataService.user;

    // Form data for login
    vm.loginData;

    function login() {
      authService.login(vm.loginData.email, vm.loginData.password)
        .then(function(res) {
          $log.log(res.data);
          userDataService.user = res.data.user;
          $state.go('landing');
        });
    };



  }

})();
