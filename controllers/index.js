const db = require('../db/queries.js');

const getProducts = function (req, res) {
  if (req.query.product_id === undefined) {
    const count = req.query.count || 5;
    db.getProducts(count)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  } else {
    Promise.all([
      db.getProduct(req.query.product_id),
      db.getFeatures(req.query.product_id)
    ])
      .then(([product, features]) => {
        product.features = features;
        res.status(200).json(product);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
  }
}

const getStyles = function (req, res) {
  Promise.all([
    db.getProduct(req.query.product_id),
    db.getFeatures(req.query.product_id)
  ])
    .then(([product, features]) => {
      product.features = features;
      res.status(200).json(product);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
}

module.exports = {
  getProducts,
  getStyles
}

