
require("dotenv").config();

const express = require("express");
const prisma = require("./db");

const app = express();
const PORT = 3000;

app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to Database Integration CRUD API!",
        project: "DecodeLabs Project 2"
    });
});

// Get all users
app.get("/users", async (req, res) => {
    try {
        const users = await prisma.user.findMany();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({
            message: "Failed to retrieve users."
        });
    }
});

// Create a new user
app.post("/users", async (req, res) => {
    try {
        const { email, age } = req.body;

        // Basic validation
        if (!email || age === undefined || age === null) {
            return res.status(400).json({
                message: "Email and age are required."
            });
        }

        if (!Number.isInteger(age) || age < 0) {
            return res.status(400).json({
                message: "Age must be a non-negative integer."
            });
        }

        const newUser = await prisma.user.create({
            data: {
                email,
                age
            }
        });

        res.status(201).json({
            message: "User created successfully!",
            user: newUser
        });

    } catch (error) {
        // Duplicate email
        if (error.code === "P2002") {
            return res.status(409).json({
                message: "This email already exists."
            });
        }

        console.error(error);

        res.status(500).json({
            message: "Failed to create user."
        });
    }
});


// Update an existing user
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { email, age, isActive } = req.body;

        // Validate age if provided
        if (age !== undefined && (!Number.isInteger(age) || age < 0)) {
            return res.status(400).json({
                message: "Age must be a non-negative integer."
            });
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(email !== undefined && { email }),
                ...(age !== undefined && { age }),
                ...(isActive !== undefined && { isActive })
            }
        });

        res.status(200).json({
            message: "User updated successfully!",
            user: updatedUser
        });

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "User not found."
            });
        }

        if (error.code === "P2002") {
            return res.status(409).json({
                message: "This email already exists."
            });
        }

        console.error(error);

        res.status(500).json({
            message: "Failed to update user."
        });
    }
});


// Delete a user
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: { id }
        });

        res.status(204).send();

    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                message: "User not found."
            });
        }

        console.error(error);

        res.status(500).json({
            message: "Failed to delete user."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
