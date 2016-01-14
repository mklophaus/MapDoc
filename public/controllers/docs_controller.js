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

     var configVars = ["AWSkeys", 1];
    // $http.get('configvars.json').success(function(data){
    //   configVars = data;
    // });

    // console.log(configVars);



    $http.put('/s3keys', configVars).then(function(res){
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



  }

})();
