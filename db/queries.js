const Pool = require('pg').Pool
const pool = new Pool({
  user: 'james',
  host: 'localhost',
  database: 'api',
  password: 'SimonSaysJake',
  port: 5432
})

const getUsers = (request, response) => {
  pool.query('SELECT * FROM "users"', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

module.exports = {
  getUsers
}