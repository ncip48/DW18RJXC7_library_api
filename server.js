//load express
const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

//load cors
const cors = require("cors");

//load dotenv
require("dotenv").config();

//include router
const router = require("./src/routes/router");

//define port number
const port = process.env.PORT || 5000;

const httpServer = http.createServer(app);
const httpsServer = https.createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
    ca: fs.readFileSync(path.join(__dirname, "cert", "csr.pem")),
  },
  app
);

app.use((req, res, next) => {
  if (req.protocol === "http") {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

//use json format
app.use(express.json());
//use cors
app.use(cors());
//use src/uploads/img as static
app.use("/src/uploads/img", express.static("src/uploads/img"));
app.use("/src/uploads/books", express.static("src/uploads/books"));

//define router to /api/v1
app.use("/api/v1/", router);

//listen the server
// app.listen(port, () => console.log(`Server running in port ${port}`));

httpServer.listen(5000, () => {
  console.log("HTTP Server running on port 5000");
});

httpsServer.listen(8070, () => {
  console.log("HTTPS Server running on port 5001");
});
