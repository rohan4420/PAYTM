// backend/routes/user.js
const express = require('express');

const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const  { authMiddleware } = require("../middleware");
const bcrypt = require("bcryptjs"); // Import bcrypt

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6) // Optional: Make sure password is strong (min length)
});

router.post("/signup", async (req, res) => {
    const { success, error } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input",
            details: error.errors, // More detailed error info
        });
    }

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
        return res.status(400).json({
            message: "Email already taken"
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password

    const user = await User.create({
        username: req.body.username,
        password: hashedPassword, // Save the hashed password
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' }); // Adding expiration to the token

    res.json({
        message: "User created successfully",
        token: token,
        username:user.firstName
    });
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
});

router.post("/signin", async (req, res) => {
    const { success, error } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid input",
            details: error.errors, // More detailed error info
        });
    }

    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password); // Compare hashed password
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' }); // Add token expiration

    res.json({
        token: token
    });
});


const updateBody = zod.object({
	password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateBody.safeParse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;