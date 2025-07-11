import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        genre: {
            type: String,
            required: false,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        /*
        TODO: Change all routes and change frontend to support this. (Will be taken as an input but cannot be changed by user conventionally)
        userID: {
            type: String,
            required: true,
        }
        */
    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('books',bookSchema);