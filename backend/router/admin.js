// const express = require("express");
// const connection = require("../connection");
// const jwt = require("jsonwebtoken");
// const router = express.Router();

// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const query = "SELECT * FROM Admin WHERE Name = ? AND Password = ?";
//   connection.query(query, [username, password], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: "Database error." });
//     } else if (results.length > 0) {
//       const admin = results[0];
//       const token = jwt.sign(
//         { id: admin.AdminId, role: "Admin" },
//         "your-secret-key",
//         { expiresIn: "1h" }
//       );

//       res.json({ success: true, token });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid credentials." });
//     }
//   });
// });
// router.get("/", (req, res) => {
//   const token = req.headers["authorization"];

//   const query = "SELECT * FROM Admin WHERE Token = ?";
//   connection.query(query, [token], (err, results) => {
//     if (err || results.length === 0) {
//       res.status(401).json({ error: "Unauthorized" });
//     } else {
//       res.json({ success: true, admin: results[0] });
//     }
//   });
// });

// module.exports = router;
