var app = angular.module("photoUploader");

app.controller("homeController", function ($scope, $http, $location) {
    $scope.dropped = false;//used to record whether some file has been dropped or added.
    //the function is called when the form is submitted by user.
    $scope.upload = function () {
        var file = $scope.file;
        if (file == undefined) {
            $scope.hasError = true;
            $scope.err = "Please choose a file to upload.";
        } else {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);//get binary data of the file
            //if the reading is successfully processed, this function will be called.
            fileReader.onload = function (e) {
                //call API to upload the file, and get response message.
                $http.post("/photo_uploader_api/v1/upload", {
                    name: file.name,
                    data: e.target.result,
                    size: file.size,
                    type: file.type,
                    uploadDate: new Date()
                })
                    .success(function (data) {
                        if (data.err) {
                            $scope.hasError = true;
                            $scope.err = data.err;
                        } else {
                            $scope.hasError = false;
                            $scope.message = data.message;
                        }
                    });
            };
        }
    };
    //if the dropFile field is changed, this function will be called.
    $scope.$watch("dropFile", function () {
        //if a file is dropped, change the parameters accordingly.
        if ($scope.dropFile) {
            $scope.dropped = true;
            var file = $scope.dropFile;
            $scope.file = file;
            $scope.fileName = file.name;
        }
    });
    //if the file field is changed, this function will be called.
    $scope.$watch("file", function () {
        if ($scope.file) {
            $scope.dropped = true;
            $scope.message = "";
            $scope.err = "";
            $scope.hasError = false;
        }
    });
    //if the button used to go to the list page is clicked, go the the list page.
    $scope.list = function () {
        $location.path("/list");
    };
});