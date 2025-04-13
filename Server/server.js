import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
app.use(express.json()); // To parse JSON request body
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/GeminiAI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// User Schema
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

// Register endpoint
app.post("/api/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if the user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        
        // Save the user to the database
        await newUser.save();
        
        // Create and send JWT token
        const token = jwt.sign({ id: newUser._id }, "your_jwt_secret", { expiresIn: "1h" });
        res.status(201).json({ message: "User registered successfully", token, name: newUser.fullName });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
});

// Login endpoint
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
        
        const token = jwt.sign({ id: user._id }, "your_jwt_secret", { expiresIn: "1h" });
        res.json({ message: "Login successful", token, name: user.fullName });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
});

// Start the server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
