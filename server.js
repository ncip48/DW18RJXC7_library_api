const express = require("express");
const app = express();
const router = require("./src/routes/router");
app.use(express.json());
app.use("/api/v1/", router);
const port = 5000 || process.env.PORT;
app.listen(port, () => console.log(`Server berjalan di port ${port}`));
