const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access denied. No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid token.",
        });
    }
};

module.exports = userAuth;