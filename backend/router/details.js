// const express = require("express");
// const connection = require("../connection");
// const router = express.Router();
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

// module.exports = router;
