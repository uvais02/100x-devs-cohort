const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async (req, res) => {
    // Implement admin signup logic
    const {username, password} = req.body;
    try {
        const existingAdmin = await Admin.findOne({username, password});
        if (existingAdmin) {
            return res.status(409).json({ msg: 'Admin already exists!' });
        }

        await Admin.create({
            username,
            password
        });
        
        return res.status(201).json({ msg: 'Admin registered successfully' });

    } catch (err) {
        return res.status(500).json({ error: 'Error registering user' });
    }
});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const { title, description, price, imageLink, published } = req.body;
    try {
        const newCourse = await Course.create({
            title,
            description,
            price,
            imageLink,
            published
        })
        return res.status(201).json({
            message: 'Course created successfully', 
            courseId: newCourse._id
        })
        
    } catch(err) {
        return res.status(500).json({ error: 'Error creating course' });
    }
});

router.get('/courses', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const courses = await Course.find({});
    res.status(200).json({
        courses: courses
    })
});

module.exports = router;