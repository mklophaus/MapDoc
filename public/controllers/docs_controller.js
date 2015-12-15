(function() {
  "use strict";

  angular
      .module("mapdocApp")
      .controller("DocsControlller", DocsController);

  DocsController.$inject = ["$state", "$log", "$http"];

  function DocsController($state, $log, $http) {
    var vm = this;

    vm.user = "michael";

    vm.doc = [];

    vm.newDoc = {
      name: "",
      subject: "",
      location: ""
    };

    vm.editDoc = {
      name: "",
      subject: "",
      location: ""
    };

    vm.getDocs    = getDocs;
    vm.deleteDoc = deleteDoc;
    vm.updateDoc = updateDoc;
    vm.postDoc   = postDoc;
    vm.resetEditForm = resetEditForm;

    vm.getDocs();

    function getDocs() {
      $http.get('/docs').then(function(response) {
        vm.docs = response.data;
      }, function(errRes) {
        console.error('Error!', errRes);
      });
    }

    function deleteDoc(id) {
      $http.delete('/api/docs/' + id).then(function(response) {
        console.log(response);
      }, function(errRes) {
        console.error('Error deletin fish!', errRes);
      }).then(getFishes);
    }

    function postFish() {
      $http.post('api/fishes', vm.newFish)
        .then(getFishes)
        .then(function(response) {
          vm.newFish = {
            name: "",
            category: ""
          };
        });
    }

    function updateFish(id) {
      $http.put('api/fishes/' + id, vm.editFish).then(function(response) {
        vm.editFish = {
          title: "",
          subject: ""
        };
      }, function(errRes) {
        console.log('Error fixin fish!', errRes);
      }).then(getFishes);
    }

    function resetEditForm() {
      vm.docTitle = '';
      vm.docSubject = '';
      vm.editDoc = {
        name: "",
        category: ""
      };
    }

  }

})();
