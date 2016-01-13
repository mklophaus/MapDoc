(function() {
 "use strict";

  angular
  .module("mapdocApp")
  .controller("YourDocsController", YourDocsController)

  .filter('searchFor', function(){

    return function(arr, searchString){

      if(!searchString){
        return arr;
      }

      var result = [];
      searchString = searchString.toLowerCase();

      angular.forEach(arr, function(item){
        if(item.title.toLowerCase().indexOf(searchString) !== -1){
          result.push(item);
        }
      });

      return result;
    };

});

  YourDocsController.$inject = ["$state","$scope", "$http", "userDataService"];

function YourDocsController($state, $scope, $http, userDataService){

  var vm = this;
  var currentUser = userDataService.user;
  vm.items = [];
  var documents;

   // $scope.editItem = function(item) {
   //      angular.element(document.getElementById("modal")).scope().item = item;
   //  };

    $scope.getDocs    = getDocs;
    $scope.deleteDoc = deleteDoc;
    // vm.updateDoc = updateDoc;
    // vm.resetEditorm = resetEditForm;

    $scope.getDocs();

    function getDocs() {
    documents = [];

     $http.get('/docs').then(function(response){
        angular.forEach(response.data, function(e){

            if (e.author == currentUser.name){
              documents.push(e);
            }
        });

      },
      function(err) {
          console.log('ERROR!', err);
      });

      console.log(documents);

      $scope.items = documents;
    }

    function deleteDoc(id, i) {
      $http.delete('/docs/' + id).then(function(response) {
        console.log(response);
        $scope.items.splice($scope.items.indexOf(i), 1);

      }, function(err) {
        console.error('Error deleting doc!', err);
      }).then(getDocs);
    }

    function updateDoc(id) {
      $http.put('/docs' + id, vm.editDoc).then(function(response) {
        vm.editDoc = {
          author: "",
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
