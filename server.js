const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
const db = mysql.createConnection({
    host: "kodama.proxy.rlwy.net",
    user: "root",
    password: "NUGopEyzfvyyNsbGLphNNNdkUFuVQWui",
    database: "railway",
    port:52985
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
app.get("/rides", (req, res) => {
    db.query("SELECT * FROM rides", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error fetching rides");
        } else {
            res.json(result);
        }
    });
});

app.post("/rides", (req, res) => {
    const { date, pickup, drop, fare, status } = req.body;

    const sql = `
        INSERT INTO rides 
        (ride_date, pickup_location, drop_location, fare, status)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [date, pickup, drop, fare, status],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Insert failed");
            } else {
                res.send("Ride added");
            }
        }
    );
});
app.listen(3000, () => {
    console.log("Server started on port 3000");
});
