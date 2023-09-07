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

## TODO
- Perform unit tests.
- Implement a logging system for keeping track of logs.
- Set up a rate limiter to restrict the maximum number of requests from the same source.

Define a Sensible Rate Limit: Determine what constitutes a reasonable number of requests from a single source within a given time frame. This limit should strike a balance between protecting your application and allowing legitimate users or clients to access your services.

Use Token Bucket or Leaky Bucket Algorithms: Implement rate limiting algorithms such as Token Bucket or Leaky Bucket to control the rate of incoming requests. These algorithms allow you to smooth out the request rate and prevent sudden bursts of traffic.

Set Different Rate Limits for Different Endpoints: Consider setting different rate limits for different API endpoints based on their importance or sensitivity. Critical endpoints might have stricter rate limits.

Provide Clear Error Responses: When a client exceeds the rate limit, respond with clear error messages (e.g., HTTP 429 - Too Many Requests) that indicate the reason for the rejection. Include information on how the client can retry the request after a cooldown period.

Use Exponential Backoff: Encourage clients to implement exponential backoff strategies when they receive rate-limiting errors. This reduces the load on your server during peak times.

Implement Whitelisting and Blacklisting: Allow certain trusted sources (whitelisting) to bypass rate limits or block known malicious sources (blacklisting) altogether.

Monitor and Analyze Traffic: Continuously monitor incoming traffic and analyze patterns. Adjust rate limits dynamically if you notice unexpected spikes or changes in usage patterns.

Rate Limit on Different Dimensions: Besides limiting requests per IP or user, you can also consider rate limiting based on other dimensions like API keys, user accounts, or user roles.

Consider Rate Limiting with Tokens or API Keys: Utilize tokens or API keys to identify and track clients. This allows for more granular control over rate limiting and easier revocation of access.

Plan for Scalability: Ensure that your rate-limiting mechanism can scale with the growth of your application. Distributed rate limiting solutions may be necessary in larger deployments.

Provide Rate Limiting Documentation: Clearly document the rate limits in your API documentation so that developers using your API are aware of the limitations.

Test and Fine-Tune: Regularly test your rate-limiting configuration under different scenarios to ensure it behaves as expected. Be prepared to adjust and fine-tune the limits as needed.