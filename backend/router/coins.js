// const express = require("express");
// const connection = require("../connection");
// const router = express.Router();

// router.get("/", (req, res) => {
//   const query = "SELECT * FROM Coins";
//   connection.query(query, (err, results) => {
//     if (err) {
//       res.status(500).json({ error: "Database query failed" });
//     } else {
//       res.json(results);
//     }
//   });
// });

// router.get("/:id", (req, res) => {
//   const { id } = req.params;
//   const query = "SELECT * FROM Coins WHERE CoinID = ?";
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else if (results.length === 0) {
//       res.status(404).json({ error: "Coin not found." });
//     } else {
//       res.json(results[0]);
//     }
//   });
// });
// router.post("/:id", (req, res) => {
//   const { id } = req.params;

//   const query = "UPDATE Coins SET Views = Views + 1 WHERE CoinID = ?";
//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to update views." });
//     } else if (results.affectedRows === 0) {
//       res.status(404).json({ error: "Coin not found." });
//     } else {
//       res.json({ success: true, message: "View count updated." });
//     }
//   });
// });
// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const {
//     name,
//     country,
//     composition,
//     quality,
//     denomination,
//     year,
//     weight,
//     price,
//     shortDescription,
//     longDescription,
//     frontImg,
//     backImg,
//   } = req.body;

//   if (
//     !name ||
//     !country ||
//     !composition ||
//     !quality ||
//     !denomination ||
//     !year ||
//     !weight ||
//     !price ||
//     !shortDescription ||
//     !longDescription ||
//     !frontImg ||
//     !backImg
//   ) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   const query = `
//       UPDATE Coins
//       SET
//         Name = ?,
//         IssuingCountry = ?,
//         Composition = ?,
//         Quality = ?,
//         Denomination = ?,
//         Year = ?,
//         Weight = ?,
//         Price = ?,
//         ShortDescription = ?,
//         LongDescription = ?,
//         FrontImageURL = ?,
//         BackImageURL = ?
//       WHERE CoinID = ?
//     `;

//   const values = [
//     name,
//     country,
//     composition,
//     quality,
//     denomination,
//     year,
//     weight,
//     price,
//     shortDescription,
//     longDescription,
//     frontImg,
//     backImg,
//     id,
//   ];

//   connection.query(query, values, (err, results) => {
//     if (err) {
//       console.error("Database Error:", err);
//       return res
//         .status(500)
//         .json({ error: "Failed to update coin in database." });
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: "Coin not found." });
//     }

//     res.json({
//       success: true,
//       message: "Coin updated successfully.",
//     });
//   });
// });
// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   const query = "DELETE FROM Coins WHERE CoinID = ?";

//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       res.status(500).json({ error: "Failed to delete the coin." });
//     } else if (results.affectedRows === 0) {
//       res.status(404).json({ error: "Coin not found." });
//     } else {
//       res.json({ success: true, message: "Coin deleted successfully." });
//     }
//   });
// });
// router.post("/", (req, res) => {
//   const {
//     name,
//     country,
//     composition,
//     quality,
//     denomination,
//     year,
//     weight,
//     price,
//     shortDescription,
//     longDescription,
//     frontImg,
//     backImg,
//   } = req.body;

//   if (
//     !name ||
//     !country ||
//     !composition ||
//     !quality ||
//     !denomination ||
//     !year ||
//     !weight ||
//     !price ||
//     !shortDescription ||
//     !longDescription ||
//     !frontImg ||
//     !backImg
//   ) {
//     return res.status(400).json({ error: "All fields are required." });
//   }

//   const query = `
//       INSERT INTO Coins
//       (Name, IssuingCountry, Composition, Quality, Denomination, Year, Weight, Price, ShortDescription, LongDescription, FrontImageURL, BackImageURL)
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//     `;

//   const values = [
//     name,
//     country,
//     composition,
//     quality,
//     denomination,
//     year,
//     weight,
//     price,
//     shortDescription,
//     longDescription,
//     frontImg,
//     backImg,
//   ];

//   connection.query(query, values, (err, results) => {
//     if (err) {
//       console.error("Database Error:", err);
//       return res.status(500).json({ error: "Failed to add coin to database." });
//     }
//     res.json({
//       success: true,
//       message: "Coin added successfully.",
//     });
//   });
// });
// // router.get("/filter", (req, res) => {
// //   const {
// //     issuingCountry,
// //     metal,
// //     quality,
// //     priceFrom,
// //     priceTo,
// //     yearFrom,
// //     yearTo,
// //   } = req.query;

// //   let query = "SELECT * FROM Coins WHERE 1=1";
// //   const params = [];

// //   if (issuingCountry) {
// //     query += " AND IssuingCountry = ?";
// //     params.push(issuingCountry);
// //   }
// //   if (metal) {
// //     query += " AND Composition = ?";
// //     params.push(metal);
// //   }
// //   if (quality) {
// //     query += " AND Quality = ?";
// //     params.push(quality);
// //   }
// //   if (priceFrom) {
// //     query += " AND Price >= ?";
// //     params.push(priceFrom);
// //   }
// //   if (priceTo) {
// //     query += " AND Price <= ?";
// //     params.push(priceTo);
// //   }
// //   if (yearFrom) {
// //     query += " AND Year >= ?";
// //     params.push(yearFrom);
// //   }
// //   if (yearTo) {
// //     query += " AND Year <= ?";
// //     params.push(yearTo);
// //   }

// //   connection.query(query, params, (err, results) => {
// //     if (err) {
// //       res.status(500).send(err);
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // });
// // router.get("/search", (req, res) => {
// //   const { name } = req.query;

// //   const query = `
// //       SELECT *
// //       FROM Coins
// //       WHERE Name LIKE ?`;

// //   connection.query(query, [`%${name}%`], (err, results) => {
// //     if (err) {
// //       res.status(500).send(err);
// //     } else {
// //       res.json(results);
// //     }
// //   });
// // });
// module.exports = router;
