const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const connection = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "Tel2234221nu",
  database: "CoinCatalog",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the MySQL database.");
});

app.get("/coins", (req, res) => {
  const query = "SELECT * FROM Coins";

  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database query failed" });
    } else {
      res.json(results);
    }
  });
});

//! Pagination
app.get("/coin", (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  const offset = (page - 1) * limit;

  const query = "SELECT * FROM Coins ORDER BY CoinID DESC LIMIT ? OFFSET ?";
  connection.query(
    query,
    [parseInt(limit), parseInt(offset)],
    (err, results) => {
      if (err) {
        res.status(500).json({ error: "Failed to fetch coins." });
      } else {
        connection.query(
          "SELECT COUNT(*) as total FROM Coins",
          (err, countResults) => {
            if (err) {
              res.status(500).json({ error: "Failed to fetch total count." });
            } else {
              res.json({
                data: results,
                total: countResults[0].total,
                page: parseInt(page),
                limit: parseInt(limit),
              });
            }
          }
        );
      }
    }
  );
});

//! Categories
app.get("/category", (req, res) => {
  const query = "SELECT * FROM Categories";
  connection.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/list/:id", (req, res) => {
  const { id } = req.params;

  const query = `
    SELECT Coins.*
    FROM Coins
    JOIN CoinCategories ON Coins.CoinID = CoinCategories.CoinID
    WHERE CoinCategories.CategoryID = ?`;

  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/details/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM Coins WHERE CoinID = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else if (results.length === 0) {
      res.status(404).json({ error: "Coin not found." });
    } else {
      res.json(results[0]);
    }
  });
});

//! Filter and search

app.get("/search", (req, res) => {
  const { name } = req.query;

  const query = `
    SELECT *
    FROM Coins
    WHERE Name LIKE ?`;

  connection.query(query, [`%${name}%`], (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

app.get("/filter", (req, res) => {
  const {
    issuingCountry,
    metal,
    quality,
    priceFrom,
    priceTo,
    yearFrom,
    yearTo,
  } = req.query;

  let query = "SELECT * FROM Coins WHERE 1=1";
  const params = [];

  if (issuingCountry) {
    query += " AND IssuingCountry = ?";
    params.push(issuingCountry);
  }
  if (metal) {
    query += " AND Composition = ?";
    params.push(metal);
  }
  if (quality) {
    query += " AND Quality = ?";
    params.push(quality);
  }
  if (priceFrom) {
    query += " AND Price >= ?";
    params.push(priceFrom);
  }
  if (priceTo) {
    query += " AND Price <= ?";
    params.push(priceTo);
  }
  if (yearFrom) {
    query += " AND Year >= ?";
    params.push(yearFrom);
  }
  if (yearTo) {
    query += " AND Year <= ?";
    params.push(yearTo);
  }

  connection.query(query, params, (err, results) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(results);
    }
  });
});

//! Admin Panel coin

app.delete("/coins/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM Coins WHERE CoinID = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to delete the coin." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Coin not found." });
    } else {
      res.json({ success: true, message: "Coin deleted successfully." });
    }
  });
});

app.post("/coins/:id", (req, res) => {
  const { id } = req.params;

  const query = "UPDATE Coins SET Views = Views + 1 WHERE CoinID = ?";
  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to update views." });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Coin not found." });
    } else {
      res.json({ success: true, message: "View count updated." });
    }
  });
});
app.post("/coins", (req, res) => {
  const {
    name,
    country,
    composition,
    quality,
    denomination,
    year,
    weight,
    price,
    shortDescription,
    longDescription,
    frontImg,
    backImg,
  } = req.body;

  if (
    !name ||
    !country ||
    !composition ||
    !quality ||
    !denomination ||
    !year ||
    !weight ||
    !price ||
    !shortDescription ||
    !longDescription ||
    !frontImg ||
    !backImg
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = `
    INSERT INTO Coins
    (Name, IssuingCountry, Composition, Quality, Denomination, Year, Weight, Price, ShortDescription, LongDescription, FrontImageURL, BackImageURL)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    name,
    country,
    composition,
    quality,
    denomination,
    year,
    weight,
    price,
    shortDescription,
    longDescription,
    frontImg,
    backImg,
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: "Failed to add coin to database." });
    }
    res.json({
      success: true,
      message: "Coin added successfully.",
    });
  });
});

app.put("/coins/:id", (req, res) => {
  const { id } = req.params;
  const {
    name,
    country,
    composition,
    quality,
    denomination,
    year,
    weight,
    price,
    shortDescription,
    longDescription,
    frontImg,
    backImg,
  } = req.body;

  if (
    !name ||
    !country ||
    !composition ||
    !quality ||
    !denomination ||
    !year ||
    !weight ||
    !price ||
    !shortDescription ||
    !longDescription ||
    !frontImg ||
    !backImg
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = `
    UPDATE Coins
    SET
      Name = ?,
      IssuingCountry = ?,
      Composition = ?,
      Quality = ?,
      Denomination = ?,
      Year = ?,
      Weight = ?,
      Price = ?,
      ShortDescription = ?,
      LongDescription = ?,
      FrontImageURL = ?,
      BackImageURL = ?
    WHERE CoinID = ?
  `;

  const values = [
    name,
    country,
    composition,
    quality,
    denomination,
    year,
    weight,
    price,
    shortDescription,
    longDescription,
    frontImg,
    backImg,
    id,
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ error: "Failed to update coin in database." });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Coin not found." });
    }

    res.json({
      success: true,
      message: "Coin updated successfully.",
    });
  });
});

//! Login
const jwt = require("jsonwebtoken");

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM Admin WHERE Name = ? AND Password = ?";
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error." });
    } else if (results.length > 0) {
      const admin = results[0];
      const token = jwt.sign(
        { id: admin.AdminId, role: "Admin" },
        "your-secret-key",
        { expiresIn: "1h" }
      );

      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials." });
    }
  });
});

app.post("/userlogin", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM User WHERE Name = ? AND Password = ?";
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Database error." });
    } else if (results.length > 0) {
      const user = results[0];
      const token = jwt.sign(
        { id: user.UserId, role: "User" },
        "your-secret-key",
        { expiresIn: "1s" }
      );

      res.json({ success: true, token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials." });
    }
  });
});

app.get("/admin", (req, res) => {
  const token = req.headers["authorization"];

  const query = "SELECT * FROM Admin WHERE Token = ?";
  connection.query(query, [token], (err, results) => {
    if (err || results.length === 0) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      res.json({ success: true, admin: results[0] });
    }
  });
});

app.get("/cart", (req, res) => {
  const token = req.headers["authorization"];

  const query = "SELECT * FROM User WHERE Token = ?";
  connection.query(query, [token], (err, results) => {
    if (err || results.length === 0) {
      res.status(401).json({ error: "Unauthorized" });
    } else {
      res.json({ success: true, user: results[0] });
    }
  });
});
//! Cart

app.get("/cart/:userId", (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT Coins.CoinID, Coins.Name, Coins.Price, Coins.ShortDescription, Coins.FrontImageURL
    FROM Cart
    JOIN Coins ON Cart.CoinID = Coins.CoinID
    WHERE Cart.UserID = ?
  `;

  connection.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to fetch cart items." });
    } else {
      res.json(results);
    }
  });
});

app.post("/cart/add", (req, res) => {
  const { userId, coinId } = req.body;

  const query = "INSERT INTO Cart (UserID, CoinID) VALUES (?, ?)";
  connection.query(query, [userId, coinId], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to add item to cart." });
    } else {
      res.status(201).json({ success: true, message: "Item added to cart." });
    }
  });
});

app.delete("/cart/:userId/:coinId", (req, res) => {
  const { userId, coinId } = req.params;

  const query = "DELETE FROM Cart WHERE UserID = ? AND CoinID = ?";
  connection.query(query, [userId, coinId], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Failed to remove item from cart." });
    } else {
      res.json({ success: true, message: "Item removed from cart." });
    }
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});

// const express = require("express");
// const cors = require("cors");

// const coinsRoutes = require("./routes/coins");
// const categoriesRoutes = require("./routes/categories");
// const adminRoutes = require("./routes/admin");

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.use("/coins", coinsRoutes);
// app.use("/categories", categoriesRoutes);
// app.use("/admin", adminRoutes);
// app.use("/coin", coinRoutes);
// app.use("/list", categoriesRoutes);

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
