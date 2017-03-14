var app = angular.module("photoUploader");

app.controller("homeController", function ($scope, $http, $location) {
    $scope.dropped = false;
    var data = "";
    $scope.upload = function () {
        var file = $scope.file;
        if (file == undefined) {
            $scope.hasError = true;
            $scope.err = "Please choose a file to upload.";
        } else {
            var fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = function (e) {
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
    $scope.$watch("dropFile", function () {
        if ($scope.dropFile) {
            $scope.dropped = true;
            var file = $scope.dropFile;
            $scope.file = file;
            $scope.fileName = file.name;
        }
    });
    $scope.$watch("file", function () {
        if ($scope.file) {
            $scope.dropped = true;
            $scope.message = "";
            $scope.err = "";
            $scope.hasError = false;
        }
    });
    $scope.list = function () {
        $location.path("/list");
    };
});