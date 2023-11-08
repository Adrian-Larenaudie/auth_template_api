## NODE JS AUTH TEMPLATE

This is a template to start a Node.js API with a REST architecture.  
An authentication system with email and password is already in place.  
The JWT system includes signature verification using an asymmetric encryption system with a generated public key and private key when the application is launched.  
A user collection with CRUD operations is set up, and access to resources in this collection is restricted to users logged in with the 'admin' role.  
By default, a connection via MongoDB is established but you are free to manage an other database system.  

**To make the application work, you need to:**

- Install Node.js.
- Clone the application.
- Having an access to a MongoDB database `https://www.mongodb.com/docs`
- Define environment variables by copying the '.env.example' file and renaming it to '.env.'
- Run the `npm install` command.
- Run the `npm run dev` command to start this application.
- When application is running run `npx jest` command to launch tests.  
**Nota bene:** before performing tests check file `./tests/routes/testConfig.json` &:
    - add the `adminId` value generated on default admin creation 
    - add the base uri to your application
    - check the `badAdminId` value make sure this id is not used into your data base

**By default, an admin is generated with the following informations:**  
- username: "admin"
- email: "admin@admin.com"
- password: "secret"

You must modify these details to avoid security issues and remove the code that generates this user during the application's launch.  

A Swagger documentation is available in the './documentation' folder.  
Copy the contents of the '.yml' file to this address: `https://editor.swagger.io`

**To add a CRUD (Create, Read, Update, Delete) to the application:**

- Define a MongoDB model in ./models
- Create a controller in ./controllers with the following methods:
    - create
    - update
    - getById
    - getAll
    - delete
- Declare the routes in a new file in the ./routes directory.
- Import these routes in the main entry file.

**By default, a rate limiter is set up. Feel free to change the options of this functionality.**