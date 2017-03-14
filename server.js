var express = require("express");
var app = express();
var restRouter = require("./routes/rest");
var indexRouter = require("./routes/index");
var mongoose = require("mongoose");

//connect to the database
mongoose.connect("PLEASE USE DATABASE INFORMATION HERE");

//configure the static file root
app.use("/public", express.static(__dirname + "/public"));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

//route different urls to different routers
app.use("/", indexRouter);
app.use("/photo_uploader_api/v1/", restRouter);

app.listen(3000);
