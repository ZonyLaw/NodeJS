require("dotenv").config();
const mysql = require("mysql2");
const dbPassword = process.env.DB_PASSWORD;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: dbPassword,
});

module.exports = pool.promise();
