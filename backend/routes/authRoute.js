import express from "express";
import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Will make it an actual secret in later stages of development
// For now, it's just a placeholder
const JWT_SECRET = "your-secret-key-here-change-this-in-production";

// Route for user registration
router.post('/register', async (request, response) => {
    try{
        const { usr, email, password } = request.body;
        if(!usr || !email || !password){
            return response.status(400).send({
                message: "Please provide all required fields: usr, email, password"
            });
        }
        // Check if user already exists
        // This means we are going to need reset password logic eventually
        const existingUser = await User.findOne({ email: email });
        if(existingUser){
            return response.status(400).send({
                message: "User with this email already exists"
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn : '7d'});

        response.status(201).send({
            message: "User Created Successfully",
            token: token,
            user: {
                id: user._id,
                usr: usr,
                email: email,

            }
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for user login


export default router;