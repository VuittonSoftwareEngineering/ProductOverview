require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.DB_PORT,
// })

// const getProducts = () => {
//   return pool.query('SELECT * FROM products LIMIT 5', (error, results) => {
//     if (error) {
//       throw error
//     }
//     console.log('should be returning data here');
//     return results.rows;
//   })
// }

const getProducts = (count) => {
  return pool.query(`SELECT * FROM products LIMIT ${count}`)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return err;
    })
}

const getProduct = (product_id) => {
  return pool.query(`SELECT * FROM products WHERE id = ${product_id}`)
    .then(res => {
      return res.rows[0];
    })
    .catch(err => {
      return err;
    })
}

const getFeatures = (product_id) => {
  return pool.query(`SELECT feature, value FROM features WHERE product_id = ${product_id}`)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return err;
    })
}

const getStyles = (product_id) => {
  return pool.query(`SELECT * FROM styles WHERE product_id = ${product_id}`)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return err;
    })
}

const getSkus = (style_ids) => {
  const styleList = style_ids.join();
  return pool.query(`SELECT * FROM skus WHERE style_id IN (${styleList})`)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      console.log('logging error in getSkus');
      return err;
    })
}

const getPhotos = (style_ids) => {
  const styleList = style_ids.join();
  return pool.query(`SELECT * FROM photos WHERE style_id IN (${styleList})`)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return err;
    })
}

const getRelated = (product_id) => {
  return pool.query(`SELECT related_product_id FROM related WHERE current_product_id = ${product_id}`)
  .then(res => {
    return res.rows;
  })
  .catch(err => {
    return err;
  })
}

module.exports = {
  getProducts,
  getProduct,
  getFeatures,
  getStyles,
  getSkus,
  getPhotos,
  getRelated
}