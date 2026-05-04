const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// DB Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "manager",
    database: "customerdb"
});

// CONNECT
db.connect(err => {
    if (err) console.log(err);
    else console.log("MySQL Connected");
});

// ➕ ADD
app.post("/customers", (req, res) => {
    const { name, email, phone } = req.body;
    db.query(
        "INSERT INTO customers (name,email,phone) VALUES (?,?,?)",
        [name, email, phone],
        (err) => {
            if (err) res.send(err);
            else res.send("Added");
        }
    );
});

// 📖 GET + 🔍 SEARCH
app.get("/customers", (req, res) => {
    const search = req.query.search || "";
    const sql = "SELECT * FROM customers WHERE name LIKE ? OR email LIKE ?";
    
    db.query(sql, [`%${search}%`, `%${search}%`], (err, result) => {
        if (err) res.send(err);
        else res.send(result);
    });
});

// ✏️ UPDATE
app.put("/customers/:id", (req, res) => {
    const { name, email, phone } = req.body;
    const { id } = req.params;

    db.query(
        "UPDATE customers SET name=?, email=?, phone=? WHERE id=?",
        [name, email, phone, id],
        (err) => {
            if (err) res.send(err);
            else res.send("Updated");
        }
    );
});

// ❌ DELETE
app.delete("/customers/:id", (req, res) => {
    const { id } = req.params;

    db.query("DELETE FROM customers WHERE id=?", [id], (err) => {
        if (err) res.send(err);
        else res.send("Deleted");
    });
});

app.listen(3001, () => console.log("Server running on 3001"));