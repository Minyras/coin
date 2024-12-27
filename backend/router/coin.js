// const express = require("express");
// const connection = require("../connection");
// const router = express.Router();
// router.get("/", (req, res) => {
//   const { page = 1, limit = 2 } = req.query;
//   const offset = (page - 1) * limit;

//   const query = "SELECT * FROM Coins ORDER BY CoinID DESC LIMIT ? OFFSET ?";
//   connection.query(
//     query,
//     [parseInt(limit), parseInt(offset)],
//     (err, results) => {
//       if (err) {
//         res.status(500).json({ error: "Failed to fetch coins." });
//       } else {
//         connection.query(
//           "SELECT COUNT(*) as total FROM Coins",
//           (err, countResults) => {
//             if (err) {
//               res.status(500).json({ error: "Failed to fetch total count." });
//             } else {
//               res.json({
//                 data: results,
//                 total: countResults[0].total,
//                 page: parseInt(page),
//                 limit: parseInt(limit),
//               });
//             }
//           }
//         );
//       }
//     }
//   );
// });

// module.exports = router;
