require('dotenv').config();
const { Client } = require('pg');
const fastCSV = require('fast-csv');

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
})

client.connect();

const stream = fs.createReadStream(FILENAME);

fastCSV
  .parse()
  .on('data', row => {
    const query = 'INSERT INTO mytable(col1, col2, col3) VALUES($1, $2, $3)';
    const values = [row[0], row[1], row[2]];
    client.query(query, values);
  })
  .on('end', () => {
    client.end();
  });

stream.pipe(fastCSV);
