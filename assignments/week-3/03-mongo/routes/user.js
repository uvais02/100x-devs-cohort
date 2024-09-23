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

router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
    try {
        const allCourse = await Course.find({});
        res.status(200).json({
            courses: allCourse
        });

    } catch(err) {
        res.status(500).json({
            msg: "Error while getting all the courses!"
        });
    }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const username = req.headers.username;
    const courseId = req.params.courseId;
    try {
        const courseExists = await Course.findOne({_id: courseId});
        if (!courseExists) {
            return res.status(404).json({
                msg: `No course found for the id ${courseId}!`
            });
        }

        const user = await User.findOne(
            {
                username
            },
            {
                purchasedCourses: 1
            }
        );

        if (user.purchasedCourses.includes(courseId)) {
            return res.status(400).json({
                msg: "You have already purchased this course!"
            });
        }
        

        await User.updateOne(
            {
                username
            },
            {
                "$push": {
                    purchasedCourses: courseId
                }
            }
        )

        res.status(201).json({
            msg: "Course purchased successfully!"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Error while purchasing course!"
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const {username, password} = req.headers;

    try {
        const user = await User.findOne(
            {
                username
            },
            {
                purchasedCourses: 1
            }
        );

        const purchased = await Course.find({
                                _id: {
                                    "$in": user.purchasedCourses
                                }
                            });

        res.status(200).json(
            {
                courses: purchased
            }
        );
    } catch(err) {
        res.status(500).json(
            {
                msg: "Error while getting purchased courses!"
            }
        );
    }



});

module.exports = router