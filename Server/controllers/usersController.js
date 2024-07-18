const bcrypt = require("bcryptjs");
const User = require("../models/userDeatils");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "User created successfully"});
  } catch (error) {
    console.error("Error in userSignup:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

const adminSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let existingAdmin = await User.findOne({ email, role: "admin" });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });

    await newAdmin.save();

    const token = jwt.sign(
      { userId: newAdmin._id, email: newAdmin.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Admin created successfully"});
  } catch (error) {
    console.error("Error in adminSignup:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful",user,token });
  } catch (error) {
    console.error("Error in userLogin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, role: "admin" });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful",user, token });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  userSignup,
  adminSignup,
  userLogin,
  adminLogin,
};
