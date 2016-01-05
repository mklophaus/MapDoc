(function() {
  "use strict";

  angular
      .module("mapdocApp")
      .controller("DocsController", DocsController);

  DocsController.$inject = ["$log", "$http", "$parse", "$scope", "uiGmapGoogleMapApi", "authService", "userDataService"];

  function DocsController($log, $http, $parse, $scope, uiGmapGoogleMapApi, authService, userDataService) {
    var vm = this;

    var filePathBase = 'https://mapdocapp.s3.amazonaws.com/';

    $scope.currentUser = userDataService.user;

    vm.newDoc = {
      title: "",
      subject: "",
      location: "",
      file: ""
    };

    vm.editDoc = {
      title: "",
      subject: "",
      location: ""
    };

    var s3key, s3secret;

    $http.get('/s3keys').then(function(res){
      console.log(res.data);
      $scope.creds = {
        bucket: 'mapdocapp',
        access_key: res.data.AMAZON_KEY_ID,
        secret_key: res.data.AMAZON_SECRET
      };

    });

   function geocodeAddress(address, callback){
    var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              callback(results[0].geometry.location);
          } else {
              console.log("Geocode was not successful for the following reason: " + status);
          }
      });
    }

    $scope.upload = function() {

      console.log($scope.creds);

    // Configure The S3 Object
    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
    // AWS.config.region = 'US Standard';
    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

    if($scope.file) {
      var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

      bucket.putObject(params, function(err, data) {
        if(err) {
          // There Was An Error With Your S3 Config
          alert(err.message);
          return false;
        }
        else {
          // Success!
          alert('Upload Done');
          console.log($scope.file.name);

          console.log("LOCATION");

          var stringLocation = vm.newDoc.location;
          var geoLat, geoLng;

          geocodeAddress(stringLocation, function(latLng){
            geoLat = latLng.lat();
            geoLng = latLng.lng();

            console.log("LAT?LNG");
            console.log(geoLat);
            console.log(geoLng);

              $http.post('/docs', {
                fileUrl: filePathBase + $scope.file.name,
                title: vm.newDoc.title,
                subject: vm.newDoc.subject,
                location: vm.newDoc.location,
                latitude: geoLat,
                longitude: geoLng,
                author: userDataService.user.name,
                user_id: userDataService.user._id
              })
               .then(function(response) {
                $('#uploadInput').val('');

                vm.newDoc = {
                title: "",
                subject: "",
                location: "",
                file: ""
              };
            });

          });
        }
      })
      .on('httpUploadProgress',function(progress) {
            // Log Progress Information
            console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
          });
    }
    else {
      // No File Selected
      alert('No File Selected');
    }
  }

    vm.getDocs    = getDocs;
    vm.deleteDoc = deleteDoc;
    vm.updateDoc = updateDoc;
    vm.resetEditorm = resetEditForm;

    vm.getDocs();


    function getDocs() {
      $http.get('/docs').then(function(response) {
        //console.log(response);
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
