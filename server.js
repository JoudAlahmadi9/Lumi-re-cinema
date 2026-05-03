const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const db = new sqlite3.Database("./users.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  db.run(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    function (err) {
      if (err) {
        return res.json({ success: false, message: "Email already exists" });
      }

      res.json({ success: true, user: { name, email } });
    }
  );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.get(
    "SELECT name, email FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, user) => {
      if (!user) {
        return res.json({ success: false, message: "Wrong email or password" });
      }

      res.json({ success: true, user });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});