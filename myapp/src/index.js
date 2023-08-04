const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const news = require('./news/index');
app.use(express.json());
const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS', 'DELETE', 'PUT', 'PATCH'],
  })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/news', news);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
