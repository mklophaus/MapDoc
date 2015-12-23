(function() {
  angular.module('mapdocApp')
         .controller('UsersController', UsersController);

  UsersController.$inject = ['$state', 'authService', 'userDataService', '$log'];

  function UsersController($state, authService, userDataService, $log) {
    var vm = this;

    vm.currentUser = authService.currentUser;
    // attaching functions to controller
    vm.createUser = createUser;


    // defining function declarations
    function createUser() {
      vm.message = '';
      // use the create function in the userService
      userDataService.create(vm.userData)
        .success(function(data) {
          vm.userData = {};
          vm.message = data.message;
          console.log(vm.message);
        });

        $state.go('login');
    };
  };
})();
