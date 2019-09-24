# README
ROUTES:
GET /
renders the homepage

GET /user/:id
Get user data filtered by user id

GET /user/username/:username
Get user data filtered by user name

GET user/policieNumber/:policieId
Get the list of policies linked to a user name -> Can be accessed by users with
role "admin"

GET policies/username/:username
Get the user linked to a policy number -> Can be accessed by users with role
"admin"
