var fs = require("fs");
var photoModel = require("../models/photoModel");

var upload = function (file, callback) {
    var typeData = file.type.split("/");
    if (typeData[0] == "image") {
        var name = "./public/static/uploaded_photos/" + file.name;
        var data = file.data.split(",")[1];
        fs.stat(name, function(err, stat) {
            if(err == null) {
                callback("FileExists");
            } else if(err.code == 'ENOENT') {
                var newPhoto = new photoModel({
                    name: file.name,
                    data: file.data,
                    size: file.size,
                    uploadDate: file.uploadDate
                });
                newPhoto.save();
                fs.writeFile(name, data, "base64", function (err) {
                    if (err) {
                        callback("Error");
                    } else {
                        callback("");
                    }
                });
            } else {
                callback("Error");
            }
        });
    } else {
        callback("WrongType");
    }
};

var getList = function (callback) {
    photoModel.find({}, "name size uploadDate", function (err, data) {
        if (err) {
            callback(undefined);
            return;
        }
        var list = [];
        data.forEach(function (record) {
            var photo = {};
            photo.name = record.name;
            photo.uploadDate = record.uploadDate;
            if (record.size > 1000000) {
                photo.size = (record.size / 1000000).toFixed(2) + "MB";
            } else if (record.size > 1000) {
                photo.size = (record.size / 1000).toFixed(2) + "KB";
            } else {
                photo.size = record.size.toFixed(2) + "B";
            }
            list.push(photo);
        });
        callback(list);
    });
};

module.exports = {
    upload: upload,
    getList: getList
};