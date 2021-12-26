[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=6622633&assignment_repo_type=AssignmentRepo)

## Step-1: Plan It
- [ ] Create a component tree mock up or wireframe outlining your project, include all associated 
directories, external node modules, routes, programs you will need ... etc. Screenshot or hand these 
in via your PR or assets folder.

## Step-2: Backend Routes & ORM
- [ ] Using Node.js, Express.js, Mongoose, MongoDB, and Postman create all 6 of your CRUD routes
    - GET, GETONE, PUT/PATCH, POST, DELETE, QUERYSTRING
- [x] You should have two collections: Users & Bugs
- [ ] Screenshot, videocast/screen-record, or gif these routes working and include them in your PR or assets folder

## Step-3: Consuming Your API Client Side
Within a Client folder create a font end application using React.js that allows for:

1) The creation of new users
- [x] Users should have the following fields:
- [x] Name - string
- [x] Password - string
- [x] Email - string
- [x] Admin: boolean - true or false

2) That user should then be able to create and interact with 'bugs'
- [x] Create a user form to add bugs, it should contain following field:
- [x] Title
- [x] Description
- [x] Time (should auto-fill with system date &time)
- [x] Date (should auto-fill with system date &time)
- [x] Assignee

- [ ] All Data created should be saved in MongoDB. And displayed in an INTERACTIVE table. I should be able to click on cells and interact with each bug
by seeign more details, leaving notes, adjusting due date, etc, ...etc.
- [ ] Build a programming logic that every bug should be resolve in 3 days, after third the day the unresolved bug should be highlighted.
- [ ] Add one more field to show the leftover days to fix the bug (Total time is 3 days from the day bug is assigned).

Step-4: Styling
Make you entire application fully-styled and responsive per the past requirements.

Make sure that our application is RESTfull, meaning status codes & error handlign included for all
backend functionality along with verbose and UI friendly updates (red notice when soemthign is
not added correctly, a note saying somethign was successfully deleted, ... etc)
