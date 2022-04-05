# Project title

### Storefront Backend

---

# Table of contents


- [Project Title](#project-title)
- [Table of contents](#table-of-contents)
- [Description](#description)
- [Requirements](#requirements)
- [Technologies used](#technologies-used)
- [Installation](#installation)
- [Basic scripts](#basic-scripts)
- [Linters and formatters scripts](#linters-and-formatters-scripts)
- [Environment variables](#environment-variables)
- [Endpoints](#endpoints)
- [Database](#database)

---

# Description
[(Back to top)](#table-of-contents)

This is a complete backend solution for RESTful api for storefront using postgresql as database to hold data required and created by the endpoints, node plays the runtime environment role with the help of express as a server. 

---

# Requirements
[(Back to top)](#table-of-contents)

## Dependencies
    
1.  "bcrypt": "^5.0.1",
2.  "body-parser": "^1.19.2",
3.  "cors": "^2.8.5",
4.  "db-migrate-pg": "^1.2.2",
5.  "dotenv": "^16.0.0",
6.  "express": "^4.17.3",
7.  "jasmine": "^4.0.2",
8.  "jasmine-spec-reporter": "^7.0.0",
9.  "jsonwebtoken": "^8.5.1",
10. "pg": "^8.7.3",
11. "supertest": "^6.2.2"
---
## DevDependencies
1.  "@types/bcrypt": "^5.0.0",
2.  "@types/body-parser": "^1.19.2",
3.  "@types/cors": "^2.8.12",
4.  "@types/dotenv": "^8.2.0",
5.  "@types/eslint": "^8.4.1",
6.  "@types/eslint-config-prettier": "^6.11.0",
7.  "@types/eslint-plugin-prettier": "^3.1.0",
8.  "@types/express": "^4.17.13",
9.  "@types/jasmine": "^4.0.2",
10. "@types/jsonwebtoken": "^8.5.8",
11. "@types/nodemon": "^1.19.1",
12. "@types/pg": "^8.6.5",
13. "@types/prettier": "^2.4.4",
14. "@types/supertest": "^2.0.12",
15. "db-migrate": "^0.11.13",
16. "eslint": "^8.12.0",
17. "eslint-config-prettier": "^8.5.0",
18. "eslint-plugin-prettier": "^4.0.0",
19. "nodemon": "^2.0.15",
20. "prettier": "^2.6.1",
21. "ts-node": "^10.7.0",
22. "typescript": "^4.6.3"
---

# Technologies used
[(Back to top)](#table-of-contents)

1. JavaScript
2. Node.js
3. Express.js
4. TypeScript
5. Jasmine
6. Prettier
7. Es-lint
8. PostgreSql
9. JWT
10. db-migrate

---

# Installation
[(Back to top)](#table-of-contents)

1. Package installation: ```npm run install```
2. Database user creation: ```sh CREATE USER storefront_user WITH PASSWORD 'storefront_password';```
3. Database creation: ```sh CREATE DATABASE storefront_db;
CREATE DATABASE storefront_db_test;```
4. Give user all privileges: ```sh GRANT ALL PRIVILEGES ON DATABASE storefront_db TO storefront_user;
GRANT ALL PRIVILEGES ON DATABASE storefront_db_test TO storefront_user;```

---

# Basic scripts
[(Back to top)](#basic-scripts)

1. Test script:  ```npm run test```
2. Build script: ```npm run build```
3. Start script: ```npm run start```

---

# Linters and formatters scripts
[(Back to top)](#linters-and-formatters-scripts)

1. Es-lint script: ```npm run lint```
2. Es-lint with try to fix script: ```npm run fix:lint```
3. Prettier script: ```npm run prettier```

---

# Environment variables
[(Back to top)](#endpoints)

1. Server port: 3000
2. Database info: can be set on .env file
- POSTGRES_DB= storefront_db
- POSTGRES_DB_TEST= storefront_db_test
- POSTGRES_USER= storefront_user
- POSTGRES_PASSWORD= storefront_password
- DB_PORT= 5432
> env-example file is attached with the project with all environment variables names.

---

# Endpoints
[(Back to top)](#endpoints)

> Please refer to REQUIREMENTS.md

---

# Database
[(Back to top)](#endpoints)

> Please refer to REQUIREMENTS.md for schema 
All database tables can be created using db-migrate
- create tables: ```db-migrate up``` 
- drop all tables: ```db-migrate reset```
- drop last migration: ```db-migrate down```
- drop (N) number of migrations: ```db-migrate down -c N```
> Please note if db-migrate isn't installed globally on your machine add ```npx``` before each command.