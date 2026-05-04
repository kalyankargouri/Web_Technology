const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Gourisk@22",
  database: "smart_city"
});

db.connect(err => {
  if (err) console.log(err);
  else console.log("MySQL Connected ✅");
});

module.exports = db;