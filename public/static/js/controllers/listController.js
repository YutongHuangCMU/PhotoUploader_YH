var app = angular.module("photoUploader");

app.controller("listController", function ($scope, $http, $location) {
    $scope.getList = function () {
        $http.get("/photo_uploader_api/v1/list")
            .success(function (list) {
                if (list.length == 0) {
                    $scope.err = "No photo has been uploaded yet.";
                    $scope.showTable = false;
                } else {
                    $scope.showTable = true;
                    $scope.list = list;
                }
            });
        };
    $scope.goToUpload = function () {
        $location.path("/");
    };
    $scope.getList();
});