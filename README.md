# Storefront Backend Project

## About
This is the storefront Backend Project for Udacity Course.
it was required to create API that holds all the data in database.

## How you can use it

### Setup PostgreSql databases 
1- you need to enter psql postgresql environment usnig command:
```
psql -U username postgresql
```
and enter the password related to username.

Note that the postgresql port used is: ```5432```.

2- Create 2 databases using psql postgresql, one database for real developmente process and the othe is for testing, you can create the database in postgresql command environment using the command:
```
CREATE DATABASE dev_database;
CREATE DATABASE test_database;
```
here we used 'dev_database' as the name for development database, and 'test_database' fot tesing database.

3- Connect to the desired database, in case of testing you may want to connect to testing database by using command:
```
\c test_database
```

4- To exit from postgres environment and retutn to normal bash command
```
\q
```

### Setup node environment
1- you need to install npm packages in order to e able to use this API, run the command
```
npm install
```
you will notice a folder called 'node_modules' has appeared, and all packages has been installed.

2- You have to create .env file, containing all the required parameters to create connection to postgresql database (check database.ts file to know the parameters).
this is an example of what should the .env file looks like

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=database
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB_TEST=database_test
ENV=dev
BCRYPT_PASSWORD=any-password
SALT_ROUND=10
TOKEN_SECRET=anysecret
```

3- In the .env file replace the databases names with the one you have created, POSTGRES_DB for the normal developing database, and POSTGRES_DB_TEST for the testing database. In our example it will be as following
```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=dev_database
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB_TEST=test_database
ENV=dev
BCRYPT_PASSWORD=any-password
SALT_ROUND=10
TOKEN_SECRET=anysecret
```

4- Then you will need to migrate the table to the database, you can use the command:
```typescript
db-migrate up:original
```
This will add a clear tables in the normal database.

### Using the server and endpoints
first you will need to run the server using:
``` TypeScript
npm run watch
```
note that the server runs on port: ```3000``` on localhost, so to try it goto
```
http://localhost:3000
```

#### 1- Users endpoint
a. POST '/users' this will enables you to create new user, and it will return a token, that you will use in certain endpoints.
you must enter the "firstName", "lastName", and "password" to succeufully creaete the user.

b. GET '/users' this will return all the users in database (you will need to enter token).

c. GET '/users/:id' this will return a user using its id (you will need to enter token).
example: '/users/2'

#### 2- Products endpoint
a. GET '/products' this will return all the products in database.

b. GET '/products:/id' this will return a product using its id.
example: '/products/2'

c. POST '/products' this will enables you to create new product (you will need to enter token).
you must enter the "name", "prcie" to succeufully create the prodcut, and optionally you can enter the "category" if you want.

#### 3- Orders endpoint
a. GET '/orders/:id' this will show all the orders that relate to certain user, using the user id (you will need to enter token).
example: '/orders/2', will return all the orders for user that have id of 2.

b. GET '/orders/:id/complete' this will show all the COMPLETED orders that relate to certain user, using the user id (you will need to enter token).
example: '/orders/2/complete', will return all the orders for user that have id of 2 and the order status is 'complete'.

c. POST '/orders/:id/products' this will enables you to add product to your order, knowing that parametert id is relevant to order id (you will need to enter token).
you must enter the "quantity" and "productID" to succeufully add the product.
example: '/orders/2/products', will allow you to add product to order having order_id of 2.


## Testing
### Jasmine Test
For testing there are a complete folder for migration that contains all the tables in addition to some rows, for testing purposes.
To test the API, just run the command
```
npm run test
```
this will do the following in order:
1- Build the files and convert from typescript to javascript.
2- Make the ENV variable equal to 'test' so the original database will remain safe.
3- Migrate the folder 'test_migration' to testing database, this will add all the tables in addition to some data in the table.
4- Jasmine test will run.
5- If jasmine tests were successfully done, a migration reset will be done to the testing database.

### Postman Test
#### 1- Original Database
If you want to test the testing database with postman, you will need to do the following:

a. Migrate up the required tables
```typescript
db-migrate up:original
```

b. Run the server using
```
npm run watch
```

c. After testing, reset migration
```typescript
db-migrate reset:original
```

#### 2- Testing Database
If you want to test the testing database with postman, you will need to do the following:

a. change ENV value in .env file to test

b. Migrate up the required tables
```typescript
db-migrate up:test_migration -e test
```

c. Run the server using
```
npm run watch
```

d. After testing, reset migration
```typescript
db-migrate reset:test_migration -e test
```