CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_digest VARCHAR
);

INSERT INTO users(first_name, last_name, password_digest) VALUES ('ahmed', 'hamed','pass123');
INSERT INTO users(first_name, last_name, password_digest) VALUES ('mohamed', 'abdallah','newpassword123');