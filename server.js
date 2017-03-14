var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");

mongoose.connect("PLEASE USE THE DATABASE INFORMATION HERE");

app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));
app.use("/", indexRouter);
app.use("/photo_uploader_api/v1/", restRouter);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.listen(3000);
