const express = require('express');
const app = express();
const db = require('./db');
const port = 5000;

app.use(express.json());

app.get('/hello', (req, res) => {
   res.send('Hello World!!');
})

app.post('/users', (req, res) => {
  console.log("Request body:", req.body); //debug
  const { nama, email } = req.body;

  const sql = "INSERT INTO users (nama, email) VALUES (?, ?)";
  db.query(sql, [nama, email], (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "User added", id: result.insertId });
  });
});


app.get('/about', (req, res) => {
  res.json({ message: "Ini endpoint About" });
});

app.listen(port, () => {
   console.log(`Example App Listen to ${port}`);
})

//        ../node_modules/long/ .
//        ../node_modules/lru-cache/.
//        ../node_modules/lru.min/.
//        ../node_modules/mysql2/.
//        ../node_modules/named-placeholders/.
//        ../node_modules/seq-queue/.
//        ../node_modules/sqlstring/.