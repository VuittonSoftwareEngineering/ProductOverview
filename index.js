require('dotenv').config();
const express = require('express');
const logger = require('./middleware/logger.js');
const db = require('./db/queries.js');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', (res, req) => {
  console.log('Hitting users');
  db.getUsers(res, req);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`listening on ${PORT}`); });