(function() {
  "use strict";

  angular
      .module("mapdocApp")
      .controller("DocsController", DocsController);

  DocsController.$inject = ["$state", "$log", "$http"];

  function DocsController($state, $log, $http) {
    var vm = this;

    vm.user = "michael";

    vm.docs = [];

    vm.newDoc = {
      title: "",
      subject: "",
      location: ""
    };

    vm.editDoc = {
      title: "",
      subject: "",
      location: ""
    };

    vm.getDocs    = getDocs;
    vm.deleteDoc = deleteDoc;
    vm.updateDoc = updateDoc;
    vm.postDoc   = postDoc;
    vm.resetEditorm = resetEditForm;

    vm.getDocs();

    function getDocs() {
      $http.get('/docs').then(function(response) {
        console.log(response);
        vm.docs = response.data;
      }, function(err) {
        console.error('Error!', err);
      });
    }

    function deleteDoc(id) {
      $http.delete('/docs/' + id).then(function(response) {
        console.log(response);
      }, function(err) {
        console.error('Error deleting doc!', err);
      }).then(getDocs);
    }

    function postDoc() {
      $http.post('/docs', vm.newDoc)
        .then(getDocs)
        .then(function(response) {
          vm.newDoc = {
            title: "",
            subject: "",
            location: ""
          };
        });
    }

    function updateDoc(id) {
      $http.put('/docs' + id, vm.editDoc).then(function(response) {
        vm.editDoc = {
          title: "",
          subject: "",
          location: ""
        };
      }, function(err) {
        console.log('Error editing!', err);
      }).then(getDocs);
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
