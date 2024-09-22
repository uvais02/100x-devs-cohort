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

        const newAdmin = new Admin({username, password});
        await newAdmin.save();
        return res.status(201).json({ msg: 'Admin registered successfully' });

    } catch (err) {
        return res.status(500).json({ error: 'Error registering user' });
    }
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
});

module.exports = router;