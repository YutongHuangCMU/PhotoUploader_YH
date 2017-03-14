var express = require("express");
var app = express();
var router = express.Router();
var fileService = require("../services/fileService");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json({limit: '50mb'});
var photoModel = require("../models/photoModel");

router.get("/list", function (req, res) {
    var listInfo = undefined;
    fileService.getList(function (list) {
        if (list) {
            listInfo = list;
        }
        res.json(listInfo);
    });
});

router.post("/upload", jsonParser, function (req, res) {
    fileService.upload(req.body, function (err) {
        var errMessage = "";
        var message = "";
        if (err == "Error") {
            errMessage = "There is something wrong with uploading your photo.";
        } else if (err == "FileExists") {
            errMessage = "There is a photo has the same name already existing."
        } else if (err == "WrongType") {
            errMessage = "You have chosen wrong file type, please choose a photo to upload."
        } else {
            message = "Your photo has been successfully uploaded!"
        }
        res.json({
            err: errMessage,
            message: message
        });
    });
});

module.exports = router;