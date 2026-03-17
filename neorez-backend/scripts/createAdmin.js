const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// change this to your DB connection
const DB_URI = "mongodb://localhost:27017/myapp";

// user model (adjust path if different)
const User = require("../models/User");

async function createAdmin() {
  try {
    await mongoose.connect(DB_URI);

    const email = "aminaminabdullah9@gmail.com";
    const password = "Admin@123";

    const existing = await User.findOne({ email });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name: "Admin",
      email: email,
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Admin user created successfully");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();