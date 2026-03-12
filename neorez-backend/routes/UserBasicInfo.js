const express = require("express")
const { addUserInfo, getUserInfo, uploadCV, getCurrentUser } = require("../controllers/UserBasicInfo");
const multer = require("multer");

const app = express()

const router = express.Router()
// Multer setup for file uploads
// const upload = multer({
//     dest: "uploads/", limits: {
//         fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
//     },
// });

// Define the route
router.post("/upload", uploadCV);
router.post("/", addUserInfo)
router.get("/:userId", getUserInfo)
router.get("/get-user/:userId", getCurrentUser)


module.exports = router