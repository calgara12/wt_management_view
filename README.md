# Installation
1. Clone Repository
2. Setup the postgres database with the db.sql file
3. navigate to the /api directory and run ```npm i```
4. navigate to the /web directory and run ```npm i```
5. Add your config.json that contains your db credentials
Example
```json
{
    "database": {
        "host": "localhost",
        "user": "postgres",
        "password": "postgres",
        "database": "postgres",
        "port": 5432
    }
}

```
5. start the api with ```node server.js```
6. start the angular app with ```ng serve```
7. Visit http://localhost:4200