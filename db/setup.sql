-- CREATE DATABASE productDB

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  slogan VARCHAR(100),
  description VARCHAR(500),
  category VARCHAR(100),
  default_price NUMERIC
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  product_id INT,
  feature VARCHAR(100),
  value VARCHAR(100),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS styles (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR(100),
  original_price NUMERIC,
  sale_price NUMERIC,
  default_item BOOLEAN,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL PRIMARY KEY,
  style_id INT,
  quantity INT,
  size VARCHAR(5),
  FOREIGN KEY (style_id) REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  style_id INT,
  thumbnail_irl VARCHAR(100),
  url VARCHAR(100),
  FOREIGN KEY (style_id) REFERENCES styles(id)
);