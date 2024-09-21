const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())


const jwtSecret = 'secretKey'

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

function userExists(username, password) {
    return ALL_USERS.filter(user => user.username == username && user.password == password)
            .length > 0
}

/*
  receive username and password through body
  returns a jwt with username encrypted
*/
app.post('/signin', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    if (!userExists(username, password)) {
        return res.status(403).json({
          msg: "User doesn't exist in our in memory db",
        });
    }

    var token = jwt.sign({
        username: username
    }, jwtSecret)

    return res.status(200).json({
        Bearer: token
    })

})

/*
    returns an array of all users if user is signed in (token is correct)
    get token through header
    else return 403
*/
app.get('/users', (req, res) => {
    const token = req.headers.authorization
    console.log(token)

    try {
        const v = jwt.verify(token, jwtSecret)
        const username = v.username

        if (!ALL_USERS.some(user => user.username == username)) {
            return res.status(401).json({
                msg: "Unauthorized access"
            })
        }

        const filteredUsers = ALL_USERS.filter(user => user.username !== username)

        return res.status(200).json({
            filteredUsers
        })
    } catch(err) {
        return res.status(401).json({
            msg: "Invalid token"
        })
    }

})

app.listen(3000, () => {
    console.log('Server started')
})