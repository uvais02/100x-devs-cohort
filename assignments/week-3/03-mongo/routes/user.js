const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const {User, Course} = require('../db');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    let {username, password} = req.body;
    try {
        const existingUser = await User.findOne({username, password});
        if (existingUser) {
            return res.status(409).json({
                msg: "User already exists!"
            });
        }

        await User.create({username, password});
        res.status(201).json({
            msg: "User created successfully!"
        });
    } catch (err) {
        res.status(500).json({
            msg: "Error while creating user!"
        });
    }

});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
});

module.exports = router