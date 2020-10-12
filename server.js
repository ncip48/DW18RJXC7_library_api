//load express
const express = require("express");
const app = express();

//load cors
const cors = require("cors");

//load dotenv
require("dotenv").config();

//include router
const router = require("./src/routes/router");

//use json format
app.use(express.json());
//use cors
app.use(cors());

//define router to /api/v1
app.use("/api/v1/", router);

//define port number
const port = 5000 || process.env.PORT;

//listen the server
app.listen(port, () => console.log(`Server running in port ${port}`));
