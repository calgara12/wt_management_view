# Installation
1. Clone Repository
2. Create a new database.
3. Setup the postgres database with the db.sql file using the command ```psql -U <username> -d <database-name> -f db.sql``` the file is located under api/db/db.sql
4. navigate to the /api directory and run ```npm i```
5. navigate to the /web directory and run ```npm i```
6. Add your config.json to the /api directory. It should contain your db credentials
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


# Documentation

In this section we are going to add some screenshots of our application, explain the functionality and describe the choices and assumptions we made for our implementation.

## Login

![login](https://user-images.githubusercontent.com/86632022/153424176-d86a9457-6122-4b38-806d-6da509c82f59.png)

On the login page you have to enter your username and your password, both of which must be entries in the database. If the user is not logged into their account, they cannot access any of the other pages. Once the user entered correct credentials, a JSONWebToken is created to verify the user on every request. The token expires 60 minutes after the login. As long as the token is active, the user has access to all four pages (tables, users, menu-items, categories).

## General Page Structure and Functionality

On each page the columns of each table in the database are shown to the user. At the end of each row, there is an "Actions" column, which holds two buttons. The trashcan icon is to delete the entry of that row. Once clicked, applications starts an SQL query and deletes that entry in the database and reloads the page.
Below the Database entries is a form, which holds fields for each value of that specific table. With this form the user can create new entries in the database by entering data and clicking the submit button. The user cannot enter the ID as this field is set to autoincrement within the database.
The pencil icon next to the trashcan icon in the actions column is used to edit entries. If this button is clicked, the form below the tables is filled with the data of that row and the user can edit the data according to his needs. Once the user is done editing the entry, he can click the submit button and the entry is updated within the database.

In the next few sections, we are going to describe the functionalities which are specific to each page.

## Tables

![tables](https://user-images.githubusercontent.com/86632022/153428745-b09f4e7c-669c-42fe-9f88-bb38cfc8d2e7.png)

On the table page we implemented a QR Code print function for each row. By clicking the printer icon, the user can print out the specific QR code for that row. The QR code holds the ID, the location and the number of seats of that table. We also added a placeholder for an URL, which could be used to hold the link for starting the guests order.

## Users

![users](https://user-images.githubusercontent.com/86632022/153434235-f06ab40d-1ce7-4b88-8782-24ee4b90467e.png)

On the users page we implemented a select-dropdown menu for the roles of the users, as it would be unnecessarily tedious to enter the roles manually when there are only three roles anyways. As you can see in the screenshot, the passwords of the users do not show on the table, because we viewed it as problematic for each user to see the password of all the other users.
Furthermore to edit a user, you also have to know his password, and enter it in the "confirm password" textbox. Deleting a User can only be done if you have the "management" role.

## Menu-Items

![menu-items](https://user-images.githubusercontent.com/86632022/153436031-09b7a014-be40-4303-981e-571a6d095249.png)

As the menu items are supposed to hold information about which category they belong to, we decided to implement it via an integer array in the database, which holds the IDs of the categories. We decided against displaying the full names of each category in the table, as it made it look overfilled.
In order for the user to still know what categories are selected for a menu item, they can click on the edit button and the categories will display with their full name in the form below the table as shown in the following screenshot:

![image](https://user-images.githubusercontent.com/86632022/153443828-b58c0ff1-ca2b-4aad-91ea-e0a39cd95a3c.png)

To select/deselect categories, the user can click on the field now displaying the category names, which will show a dropdown list of all the categories:

![dropdown](https://user-images.githubusercontent.com/86632022/153444258-b411ac5b-373c-433f-b12e-d3790682f4d3.png)

By clicking on the box next to the category name, the user can select/deselect the categories. When selected, they will immediately show up in the 'Select Categories' field above the dropdown. The same functionality was implemented for the allergenes.

## Categories

![categories](https://user-images.githubusercontent.com/86632022/153446617-0441f5a7-9261-4a3d-aaf3-0f1ed298951f.png)

The Categories page is pretty straightforward. It displays the data stored in the database and we implemented a select for choosing the type the category belongs to, for the same reasons as the role select on the user page.
