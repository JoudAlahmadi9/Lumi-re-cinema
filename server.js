const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cinema_db"
});

db.connect((err) => {
  if (err) {
    console.log("DB Error:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// SIGN UP
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: "All fields are required"
    });
  }

  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, password], (err) => {
    if (err) {
      return res.json({
        success: false,
        message: "Email already exists"
      });
    }

    res.json({
      success: true,
      message: "Account created successfully"
    });
  });
});

// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Email and password are required"
    });
  }

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.json({
        success: false,
        message: "Database error"
      });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        message: "Login successful",
        user: result[0]
      });
    } else {
      res.json({
        success: false,
        message: "Wrong email or password"
      });
    }
  });
});

// BOOKING
app.post("/book", (req, res) => {
  const {
    userEmail,
    fullName,
    bookingEmail,
    movie,
    date,
    time,
    seats,
    totalPrice
  } = req.body;

  const sql = `
    INSERT INTO bookings
    (userEmail, fullName, bookingEmail, movie, date, time, seats, totalPrice)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [userEmail, fullName, bookingEmail, movie, date, time, seats, totalPrice],
    (err) => {
      if (err) {
        return res.json({
          success: false,
          message: "Booking failed"
        });
      }

      res.json({
        success: true,
        message: "Booking saved successfully"
      });
    }
  );
});
// CONTACT - Updated to support Guest Messages
app.post("/contact", (req, res) => {
  const { firstName, lastName, email, dob, opinion, userId } = req.body;

  // التحقق من الحقول الإلزامية فقط
  if (!firstName || !lastName || !email || !opinion) {
    return res.json({
      success: false,
      message: "Please fill all required fields"
    });
  }

  const sql = `
    INSERT INTO contact_messages 
    (user_id, first_name, last_name, email, dob, opinion) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  // استخدام userId || null للسماح بالإرسال بدون تسجيل دخول
  db.query(sql, [userId || null, firstName, lastName, email, dob, opinion], (err) => {
    if (err) {
      console.error("Database Error:", err);
      return res.json({
        success: false,
        message: "Message not saved"
      });
    }

    res.json({
      success: true,
      message: "Message sent successfully!"
    });
  });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
