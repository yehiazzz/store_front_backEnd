CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(id),
    status VARCHAR(50)
);


INSERT INTO orders (status, user_id) VALUES ('active',1);
INSERT INTO orders (status, user_id) VALUES ('complete',1);
INSERT INTO orders (status, user_id) VALUES ('complete',2);
INSERT INTO orders (status, user_id) VALUES ('active',2);
INSERT INTO orders (status, user_id) VALUES ('complete',2);

