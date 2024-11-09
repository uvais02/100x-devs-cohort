require('dotenv').config()
const mongoose = require('mongoose');

// Connect to MongoDB
MONGO_DB = 'week3_mongodb_jwt'
mongoose.connect(process.env.MONGO_URI + MONGO_DB);

// Define schemas
const AdminSchema = new mongoose.Schema({
    // Schema definition here
    username: {type: String, required: true},
    password: {type: String, required: true}
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: {type: String, required: true},
    password: {type: String, required: true},
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title: {type: String, required: true}, 
    description: {type: String, required: true},
    price: {type: Number, required: true}, 
    imageLink: {type: String, required: true}, 
    published: {type: Boolean, required: true}
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}