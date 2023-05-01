require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const adminRouter = require("./Admin/Admin.route");

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.use("/api/admin", adminRouter);

app.listen(process.env.APP_PORT, () => {
  console.log("Server is Running for Admin");
});
