var app = angular.module("photoUploader");

app.controller("listController", function ($scope, $http, $location) {
    //the function used to get list of photos
    $scope.getList = function () {
        //call API to get the list.
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
    //if the button used to go back to the upload page, go to the upload page.
    $scope.goToUpload = function () {
        $location.path("/");
    };
    //call the getList function when entering the page.
    $scope.getList();
});