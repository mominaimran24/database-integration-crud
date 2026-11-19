
require("dotenv").config();

const prisma = require("./db");

async function testDatabase() {
    try {
        await prisma.$connect();

        console.log("PostgreSQL database connected successfully!");

        const users = await prisma.user.findMany();

        console.log("Current users:", users);
    } catch (error) {
        console.error("Database connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

testDatabase();
