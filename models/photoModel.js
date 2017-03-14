var mongoose = require("mongoose");
var schema = mongoose.Schema;

var PhotoSchema = new schema ({
    name: String,
    data: String,
    size: Number,
    uploadDate: Date
});

var photoModel = mongoose.model("PhotoModel", PhotoSchema);

module.exports = photoModel;