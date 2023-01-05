-- CREATE DATABASE productDB

-- CREATE TABLE IF NOT EXISTS products (
--   id SERIAL PRIMARY KEY,
--   name VARCHAR(100),
--   slogan VARCHAR(500),
--   description VARCHAR(1000),
--   category VARCHAR(100),
--   default_price NUMERIC
-- );

-- COPY products
-- FROM '/Users/jamesleakos/Documents/Development/HackReactor/sdc/ProductOverview/db/csv_files/product.csv'
-- DELIMITER ','
-- CSV HEADER;

-- CREATE TABLE IF NOT EXISTS features (
--   id SERIAL PRIMARY KEY,
--   product_id INT,
--   feature VARCHAR(100),
--   value VARCHAR(100),
--   FOREIGN KEY (product_id) REFERENCES products(id)
-- );

-- COPY features
-- FROM '/Users/jamesleakos/Documents/Development/HackReactor/sdc/ProductOverview/db/csv_files/features.csv'
-- DELIMITER ','
-- CSV HEADER;

-- CREATE TABLE IF NOT EXISTS styles (
--   id SERIAL PRIMARY KEY,
--   product_id INT,
--   name VARCHAR(100),
--   original_price NUMERIC,
--   sale_price NUMERIC NULL,
--   default_style BOOLEAN,
--   FOREIGN KEY (product_id) REFERENCES products(id)
-- );

-- COPY styles (id, product_id, name, sale_price, original_price, default_style)
-- FROM '/Users/jamesleakos/Documents/Development/HackReactor/sdc/ProductOverview/db/csv_files/styles.csv'
-- DELIMITER ','
-- CSV HEADER
-- NULL AS 'null';

-- CREATE TABLE IF NOT EXISTS skus (
--   id SERIAL PRIMARY KEY,
--   style_id INT,
--   quantity INT,
--   size VARCHAR(25),
--   FOREIGN KEY (style_id) REFERENCES styles(id)
-- );

-- COPY skus (id, style_id, size, quantity)
-- FROM '/Users/jamesleakos/Documents/Development/HackReactor/sdc/ProductOverview/db/csv_files/skus.csv'
-- DELIMITER ','
-- CSV HEADER;

-- CREATE TABLE IF NOT EXISTS photos (
--   id SERIAL PRIMARY KEY,
--   style_id INT,
--   thumbnail_url TEXT,
--   url VARCHAR(1000),
--   FOREIGN KEY (style_id) REFERENCES styles(id)
-- );

-- COPY photos (id, style_id, url, thumbnail_url)
-- FROM '/Users/jamesleakos/Documents/Development/HackReactor/sdc/ProductOverview/db/csv_files/photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- CREATE TABLE IF NOT EXISTS related (
--   id SERIAL PRIMARY KEY,
--   current_product_id int,
--   related_product_id int
-- );

-- COPY related
-- FROM '/Users/jamesleakos/Documents/Development/HackReactor/sdc/ProductOverview/db/csv_files/related.csv'
-- DELIMITER ','
-- CSV HEADER;

-- CREATE INDEX products_product_id_index ON products(id);
-- CREATE INDEX features_product_id_index ON features(product_id);
-- CREATE INDEX styles_product_id_index ON styles(product_id);
-- CREATE INDEX skus_style_id_index ON skus(style_id);
-- CREATE INDEX photos_style_id_index ON photos(style_id);
-- CREATE INDEX related_style_id_index ON related(current_product_id);