# Feature Backlog

## todo labels signification:
**TODO**    ->  used for tasks or items that are yet to be started. 
**WIP**     ->  indicates tasks that are currently being worked on.
**TEST**    ->  ready for testing or quality assurance.
**DONE**    ->  tasks that have been successfully completed and meet the required criteria or standards. 

## Sprint 1
- DONE: Conception 
- DONE: Edit ReadMe  
- DONE: Use Case diagram 
- DONE: Connexion sequence diagram 
- DONE: Entity associations diagram 
- DONE: Swagger documentation 

## Sprint 2 BDD connexion & CRUD on user 
- DONE: Set up BDD cluster and established connexion from API
- DONE: Dev REST CRUD on users 
- DONE: Perform Tests all routes and response status

## Sprint 3 Authentication 
- DONE: Set up an authentication controller & routes (login, refreshLogin) 
- DONE: Set up rate limits on each API ressources
- DONE: Perform Tests on authentication ressources
- DONE: Perform Unit Tests on password hash
- DONE: Set up authentication system with JWT & session token

## Sprint 4 Security focus
- DONE: Make a csrf protection
- WIP: Logout method on authentication controller (end session & delete session token revoke jwt)
- TODO: control fields on POST PUT & PATCH request
- TODO: remove excess information headers rerquests
- TODO: add salt on hashing password

## Sprint 5 Client
- WIP: Make a client user interface