var express = require("express");
var cors = require("cors");
require("dotenv").config();

var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});

const multer = require("multer");
const { memoryStorage } = require("multer");
const res = require("express/lib/response");
const upload = multer({ dest: "upload/" });
app.post(
  "/api/fileanalyse",
  upload.single("upfile"),
  function (request, response) {
    response.json({
      name: request.file.originalname,
      type: request.file.mimetype,
      size: request.file.size,
    });
  }
);
