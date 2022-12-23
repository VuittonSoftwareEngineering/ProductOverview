require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
})

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
      console.log(res.rows);
      return res.rows[0];
    })
    .catch(err => {
      return err;
    })
}

const getFeatures = (product_id) => {
  return pool.query(`SELECT feature, value FROM features WHERE product_id = ${product_id}`)
    .then(res => {
      console.log(res.rows);
      return res.rows;
    })
    .catch(err => {
      return err;
    })
}

module.exports = {
  getProducts,
  getProduct,
  getFeatures
}