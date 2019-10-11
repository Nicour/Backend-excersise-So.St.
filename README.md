# README

# PROJECT NAME:

AXA APP

# ERRORS:

+ 404 - As a user I want to see a 404 error when I go to a page that doesn’t exist.
+ 500 - As a user I want to see a 500 error when it's an internal server error.

# ROUTES:


+ GET /

Renders the homepage


+ GET /user/:id

Get user data filtered by user id


+ GET /user/username/:username

Get user data filtered by user name


+ GET user/policieNumber/:policieId

Get the list of policies linked to a user name -> Can be accessed by users with
role "admin"


+ GET policies/username/:username

Get the user linked to a policy number -> Can be accessed by users with role
"admin"

# HOW TO RUN THE APP

+ Clone the repo
+ npm install
+ npm run start

The app runs on port 3000

