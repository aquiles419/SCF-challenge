# SCF-Challenge

Backend Challenge

This is the backend challenge, below are instructions on how to run the project, node v16.18.0 was used

# Installation

Install by `npm`

```shell
npm install
```

**or** install with `yarn` (this project is developed using `yarn`)

```shell
yarn install
```

# Auth

The authentication process is very simple, you send the auth in the request header, in this case, we will pass the id of a user that exists in the array of users, this is our authentication, by default there is already a user with id 1 , just add in the request: id in the key and in the value 1, and that's it, you will be able to make requests

# Documentation

`/api-docs`

To access the swagger documentation, go to http://localhost:3333/api-docs/#/ in your browser, there you will find all the endpoints of the application.

# Tests

Run the command below to run the tests:

```shell
yarn test
```

# Environment

`PORT` - Port where the project will start.

# Now it's just coding 🚀
