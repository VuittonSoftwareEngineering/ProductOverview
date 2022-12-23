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
  db.getStyles(req.query.product_id)
    .then(styles => {
      console.log(styles);
      const style_ids = styles.map(style => style.id);
      Promise.all([
        db.getSkus(style_ids),
        db.getPhotos(style_ids)
      ])
        .then(([skus, photos]) => {
          const out = { product_id: req.query.product_id };
          const results = styles.map(style => {
            // create skus object
            const filtered = skus.filter(sku => sku.style_id === style.id);
            const obj = {};
            filtered.forEach(sku => {
              obj[sku.id] = {
                quantity: sku.quantity,
                size: sku.size
              }
            })
            style.skus = obj;
            
            // create photos object
            style.photos = photos
              .filter(photo => photo.style_id === style.style_id)
              .map(photo => {
                return {
                  thumbnail_url: photo.thumbnail_url,
                  url: photo.url
                }
              })

            return style;
          })

          out.results = results;
          res.status(200).json(out);
        })
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        })
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(400);
    })
}

const getRelated = function (req, res) {
  db.getRelated(req.query.product_id)
      .then(data => {
        const out = data.map(item => {
          return item.related_product_id
        })
        res.status(200).json(out);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      })
}

module.exports = {
  getProducts,
  getStyles,
  getRelated
}

