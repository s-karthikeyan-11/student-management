require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();


connectDB();
app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
