import express, { Route } from "express";

const router = express.Router();

router.post('/', async (request, response) => {
    try {
        // Logic to connect user
        const { userID } = request.body;
        if (!userID) {
            return response.status(400).send({ message: "User ID is required." });
        }
        
        // Here we would typically save the userID to the database
        // For now, we will just return it as a success response
        return response.status(200).send({ message: "User connected successfully!", userID });
    } catch (error) {
        console.error(error.message);
        return response.status(500).send({ message: error.message });
    }
});

export default router;