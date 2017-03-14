var express = require("express");
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");

mongoose.connect("mongodb://yutong:123@ds129610.mlab.com:29610/photouploader_yh");

app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/", indexRouter);
app.use("/photo_uploader_api/v1/", restRouter);

app.listen(3000);
