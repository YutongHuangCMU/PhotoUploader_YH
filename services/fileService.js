var fs = require("fs");
var photoModel = require("../models/photoModel");

//function used to upload file, write it into local repository and send information to database
var upload = function (file, callback) {
    var typeData = file.type.split("/");
    //if the type of file is image, continue to process, otherwise return error.
    if (typeData[0] == "image") {
        var name = "./public/static/uploaded_photos/" + file.name;
        var data = file.data.split(",")[1];
        //try to find the data in the local repository. If some file with same name already exists, return error.
        fs.stat(name, function(err, stat) {
            if(err == null) {
                callback("FileExists");
            } else if(err.code == 'ENOENT') {
                //create new document and save it to the database
                var newPhoto = new photoModel({
                    name: file.name,
                    data: file.data,
                    size: file.size,
                    uploadDate: file.uploadDate
                });
                newPhoto.save();
                //write file to local repository
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
//the function used to get the list of photos.
var getList = function (callback) {
    //get three columns in the database.
    photoModel.find({}, "name size uploadDate", function (err, data) {
        if (err) {
            callback(undefined);
            return;
        }
        //modify the size into normal expression and use another list to store the new data
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