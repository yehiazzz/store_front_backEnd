CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL, 
    category VARCHAR (100) 
);


INSERT INTO products(name, price, category) VALUES ('Camera', 100,'electronics');
INSERT INTO products(name, price, category) VALUES ('laptop', 1000,'electronics');
INSERT INTO products(name, price) VALUES ('bread', 5);
INSERT INTO products(name, price) VALUES ('chees', 15);
INSERT INTO products(name, price, category) VALUES ('cars', 27,'toys');
INSERT INTO products(name, price, category) VALUES ('doll', 42,'toys');
