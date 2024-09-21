import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins withs default of cors(*)
app.use(cors());
// Option 2: Allow custom origins (This one is better)
// app.use(cors({
//     origin: 'htpp://localhost:3000',
//     methods: ['GET', 'PUT', "POST", "DELETE"],
//     allowHeaders: ['Content-Type'],
// }))

// Root route?
app.get('/', (request,response) => {
    console.log({request});
    return response.status(234).send('Welcome To MERN Stack Thing');
});

app.use('/books', booksRoute);

// Connecting to database
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App Connected to Database");
        app.listen(PORT, () => {
            console.log(`App is listening to port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
