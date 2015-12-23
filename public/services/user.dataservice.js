(function() {
  "use strict";

  angular
    .module("mapdocApp")
    .factory("userDataService", userDataService);

  userDataService.$inject = ['$http'];

  function userDataService($http) {
    var userFactory = {};

    userFactory.user = {};

    // get a single user
    userFactory.get = function(id) {
      return $http.get('/users/' + id);
    };

    // get all users
    userFactory.all = function() {
      return $http.get('/users/');
    };

    // create a user
    userFactory.create = function(userData) {
      return $http.post('/users/', userData);
    };

    // update a user
    userFactory.update = function(id, userData) {
      return $http.put('/users/' + id, userData);
    };

    // delete a user
    userFactory.delete = function(id) {
      return $http.delete('/users/' + id);
    };

    // return our entire userFactory object
    return userFactory;
  }

})();
