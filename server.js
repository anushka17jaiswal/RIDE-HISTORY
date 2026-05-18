const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@A1b1c1d1",
    database: "ride_history"
});
db.connect((err) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err);
    } else {
        console.log("MySQL Connected");
    }
});
app.get("/", (req, res) => {
    res.send("Ride History Backend Running");
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});