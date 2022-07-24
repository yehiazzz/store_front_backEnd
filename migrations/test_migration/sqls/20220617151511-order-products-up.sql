CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id)
);

INSERT INTO order_products (quantity, order_id, product_id) VALUES (20,1,6);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (15,1,1);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (200,2,3);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (10,2,2);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (10,2,6);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (1,3,6);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (12,3,2);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (7,3,1);
INSERT INTO order_products (quantity, order_id, product_id) VALUES (5,3,4);
