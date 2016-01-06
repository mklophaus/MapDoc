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

  YourDocsController.$inject = ["$scope", "$http", "userDataService"];

function YourDocsController($scope, $http, userDataService){

  var currentUser = userDataService.user;
  var documents = [];

  console.log(userDataService.user.name);

    $http.get('/docs').then(function(response){
      angular.forEach(response.data, function(e){

          console.log(e.author);
          console.log(e);

          if (e.author == currentUser.name){
            documents.push(e);
          }
      });
    },
    function(err) {
        console.log('ERROR!', err);
    });

  $scope.items = documents;

}


})();
