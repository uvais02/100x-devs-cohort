const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const ALL_USERS = [
    {
      username: "harkirat@gmail.com",
      password: "123",
      name: "harkirat singh",
    },
    {
      username: "raman@gmail.com",
      password: "123321",
      name: "Raman singh",
    },
    {
      username: "priya@gmail.com",
      password: "123321",
      name: "Priya kumari",
    },
  ];

/*
  receive username and password through body
  returns a jwt with username encrypted
*/
app.post('/signin', (req, res) => {

})

/*
    returns an array of all users if user is signed in (token is correct)
    get token through header
    else return 403
*/
app.get('/users', (req, res) => {

})