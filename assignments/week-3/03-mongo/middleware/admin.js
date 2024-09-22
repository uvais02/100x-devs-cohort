const { Admin } = require("../db");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    let {username, password} = req.headers;

    const admin = await Admin.findOne({username, password});
    if (admin) {
        next();
    }
    res.status(403).json({
        msg: "Admin doesn't exist"
    })
}

module.exports = adminMiddleware;