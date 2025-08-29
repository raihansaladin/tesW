const express = require('express');
const app = express();
const port = 5000;

app.get('/hello', (req, res) => {
   res.send('Hello World!!');
})

app.post('/data', (req, res) => {
  res.send('Data berhasil diterima!');
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