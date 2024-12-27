// const express = require("express");
// const connection = require("../connection");
// const router = express.Router();
// const cors = require("cors");
// router.get("/:id", (req, res) => {
//   const { id } = req.params;

//   const query = `
//       SELECT Coins.*
//       FROM Coins
//       JOIN CoinCategories ON Coins.CoinID = CoinCategories.CoinID
//       WHERE CoinCategories.CategoryID = ?`;

//   connection.query(query, [id], (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.json(results);
//     }
//   });
// });

// module.exports = router;
