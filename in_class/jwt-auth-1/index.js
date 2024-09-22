const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()


const DB_NAME = 'jwt_auth_1'
const MONGO_URI = process.env.MONGO_URI
const jwtSecret = process.env.JWT_SECRET

const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGO_URI}${DB_NAME}`)
        console.log('Connected to MongoDB successfully')
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}

const app = express()
app.use(express.json())

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)


async function userExists(username, password) {
    return await User.findOne({username, password})
};

app.post('/signup', async (req, res) => {
    const { username, password, name } = req.body

    try {
        const existingUser = await userExists(username, password)
        if (existingUser) {
            return res.status(403).json({ msg: "User already exists!" })
        }

        const newUser = new User({ username, password, name })
        await newUser.save()

        res.status(201).json({ msg: "User registered successfully" })
    } catch (error) {
        res.status(500).json({ error: "Error registering user" })
    }
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body

    try {
        const existingUser = await userExists(username, password)
        if (!existingUser) {
            return res.status(403).json({ msg: "User doesn't exist" })
        }

        const token = jwt.sign({ username }, jwtSecret)

        res.status(200).json({ Bearer: token })
    } catch (error) {
        res.status(500).json({ error: "Error signing in" })
    }
});

app.get('/users', async (req, res) => {
    const token = req.headers.authorization

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const { username } = decoded

        const currentUser = await User.findOne({ username })
        if (!currentUser) {
            return res.status(401).json({ msg: "Unauthorized access" })
        }

        const otherUsers = await User.find({ username: { $ne: username } })
        res.status(200).json(otherUsers)
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" })
    }
});

(async() => {
    await connectDB()
    app.listen(3000, () => {
        console.log('Server started!')
    })
})();
