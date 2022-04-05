# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- [x] Index 
>`get` http://host/products/
- [x] Show
>`get` http://host/products/:id
- [x] Create [token required]
>`post` http://host/products/
- [x] [OPTIONAL] Top 5 most popular products [(Dashboard)](#dashboard)
- [x] [OPTIONAL] Products by category (args: product category) [(Dashboard)](#dashboard)
##### Additional Products Endpoints
- Delete [token required]
> `delete` http://host/products/:id
- Update [token required]
> `put` http://host/products/

#### Users
- [x] Index [token required]
>`get` http://host/users/
- [x] Show [token required]
>`get` http://host/users/:id
- [x] Create N[token required] **token removed**
>`post` http://host/users/
##### Additional Users Endpoints
- Delete [token required]
> `delete` http://host/users/:id
- Update [token required]
> `put` http://host/users/

#### Orders
- [x] Current Order by user (args: user id)[token required] [(Dashboard)](#dashboard)
- [x] [OPTIONAL] Completed Orders by user (args: user id)[token required] [(Dashboard)](#dashboard)
##### Additional orders Endpoints
- Index 
>`get` http://host/orders/
- Show
>`get` http://host/orders/:id
- Create [token required]
>`post` http://host/orders/
- Delete [token required]
> `delete` http://host/orders/:id
- Update [token required]
> `put` http://host/orders/
- Add Product [token required]
>`post` http://host/orders/:id/products

### Additional API Endpoints
#### Categories
- Index 
>`get` http://host/categories/
- Show
>`get` http://host/categories/:id
- Create [token required]
>`post` http://host/categories/
- Delete [token required]
> `delete` http://host/categories/:id
- Update [token required]
> `put` http://host/categories/

#### Dashboard
- Products by category (args: product category) 
>`get` http://host/dashboard/categories/:id/products
- Current Order by user (args: user id)[token required]
>`get` http://host/dashboard/users/:id/orders
- Completed Orders by user (args: user id)[token required]
>`get` http://host/dashboard/users/:id/completed-orders
- Top 5 most popular products by times it was ordered
> `delete` http://host/dashboard/products/popular-times
- Top 5 most popular products by total quantity ordered
> `put` http://host/dashboard/products/popular-quantity

## Data Shapes
#### Products
- [x] id
- [x] name
- [x] price
- [x] [OPTIONAL] category FK (categories(id)) [(Categories)](#categories)

| id | name | price | category|
| -- | ---- | ----- | ------- |
| SERIAL PRIMARY KEY | VARCHAR(200) | DECIMAL NOT NULL | BIGINT REFERENCES categories(id)|

#### Users
- [x] id
- [x] firstName
- [x] lastName
- [x] password

| id | first_name | last_name | password |
| -- | ---------- | --------- | -------- |
| SERIAL PRIMARY KEY | VARCHAR(50) NOT NULL | VARCHAR(50) NOT NULL | TEXT NOT NULL|

#### Orders
- [x] id
- [x] made_by FK (users(id))
- [x] status of order (active or complete)

| id | made_by | status |
| -- | ------- | ------ |
| SERIAL PRIMARY KEY | BIGINT REFERENCES users(id) NOT NULL | DECIMAL NOT NULL | status VARCHAR(8) NOT NULL|

#### Categories
- [x] id
- [x] name

| id | name |
| -- | ---- |
| SERIAL PRIMARY KEY | VARCHAR(100) NOT NULL |

#### Orders_Products
- [x] id
- [x] order FK (orders(id)) [(Orders)](#orders)
- [x] product FK (products(id)) [(Products)](#products)
- [x] Quantity 

| id | order | product | Quantity |
| -- | ----- | ------- | -------- |
| SERIAL PRIMARY KEY | BIGINT REFERENCES orders(id) NOT NULL | BIGINT REFERENCES products(id) NOT NULL | INT|

## Entity Relationship Diagram (ERD)

![ERD!](/assets/ERD.jpg "ERD") 
*ERD*