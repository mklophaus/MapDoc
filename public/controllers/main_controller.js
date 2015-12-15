(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .controller("MainController", MainController);

  MainController.$inject = ["$state", "$log"];

  function MainController($state, $log) {

    var vm = this;

    vm.welcomeMessage = "Welcome, User";

    vm.$state = $state;

  }

})();
