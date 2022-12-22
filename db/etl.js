require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const fastCSV = require('fast-csv');

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
})

const streamer = function (filename, queryString) {
  client.connect();

  const stream = fs.createReadStream(filename);
  let i = 0;
  
  fastCSV
    .parse()
    .on('data', row => {
      const query = queryString;
      const values = [row[0], row[1], row[2], row[3], row[4], row[5]];
      client.query(query, values);
      console.log('inserted row ' + i);
      i++;
    })
    .on('end', () => {
      client.end();
    });
}

streamer(
  './db/csv_files/product.csv',
  'INSERT INTO products(id, name, slogan, description, category, default_price) VALUES($1, $2, $3, $4, $5, $6)' 
)


