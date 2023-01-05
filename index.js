require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger.js');
const controller = require('./controllers');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(logger);
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/products', (req, res) => {
  controller.getProducts(req, res);
});
app.get('/products/:product_id', (req, res) => {
  req.query.product_id = req.params.product_id;
  controller.getProducts(req, res);
});

app.get('/products/:product_id/styles', (req, res) => {
  req.query.product_id = req.params.product_id;
  controller.getStyles(req, res);
});

app.get('/products/:product_id/related', (req, res) => {
  req.query.product_id = req.params.product_id;
  controller.getRelated(req, res);
});

app.get('/loaderio-ffdd808ad5a04fb77110069a364e0303', (req, res) => {
  res.send('loaderio-ffdd808ad5a04fb77110069a364e0303');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on ${PORT}`); });