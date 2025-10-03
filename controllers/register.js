import prisma from "../prisma/prismaConnect.js";
import argon2 from "argon2";
import redisClient from '../config/redisConfig.js';

// function isValidEmail(email) {
//     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
// }

// function isValidPassword(password) {
//     return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
// }
const registerController = async (req, res) => {
    // const allowedRoles = ['user', 'hotel_owner'];
    const {name, email, password, role} = req.body

    // const userRole = role.toLowerCase();
    // const trimEmail = email.toLowerCase()
    // const trimName = name.trim();
    try {

        // if (!name || typeof name != 'string') {
        //     return res.status(400).json({"error": "Name must be a string and it is required."})
        // }

        // if (!email || typeof email != 'string') {
        //     return res.status(400).json({"error": "Email must be a string and it is required."})
        // }

        // if (!password || typeof password != 'string' || isValidPassword(password) == false) {
        //     return res.status(400).json({"error": "Password must be at least 8 characters long and include uppercase, lowercase, digit, and special character."})
        // }

        // if (!role || typeof role != 'string' || !allowedRoles.includes(userRole)) {
        //     return res.status(400).json({"error": "Role must be a string and it is required."})
        // }

        // if (!isValidEmail(trimEmail)) {
        //     return res.status(400).json({"error": "Invalid email format"});
        // }

        const existingUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (existingUser) {
            return res.status(400).json({"error": "User already exists"})
        }

        const hashedPassword = await argon2.hash(password)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            },
        })
        // Clear relevant Redis cache
        // try {
        //     const keys = await redisClient.keys('allUsers:page:*');
        //     for (const key of keys) {
        //         await redisClient.del(key);
        //     }
        //     await redisClient.del('allUsers:totalUsers');
        // } catch (err) {
        //     console.warn("Redis cache clearing failed:", err);
        // }

        const {password : pw, ...userResponse} = user

        return res.status(201).json({
            'status': 'success',
            'message' : "User created successfully",
            "user" : userResponse
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({"error": "Unexpected Internal Error Occurred"})
    }
}

export default registerController