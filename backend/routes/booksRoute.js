import express, { Route } from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();
// Route for saving a new book
router.post('/', async (request, response) => {
    try{
        if(!request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }
    catch{
        console.log(error.message);
        response.status(500).send('message: error.message');
    }
});
// Route for Get All books from database
router.get('/', async (request, response) => {
    try{
        // List of all books
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get one book from database by id
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;
        
        // List of all books
        const book = await Book.findById(id);

        return response.status(200).json({book});
    } catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to update a book
router.put('/:id', async (request, response) => {
    try{
        if(!request.body.title||
            !request.body.author||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message: "Send all required fields: title, author, publishYear",
            });
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            console.log(result)
            return response.status(404).send({message: "Book Not Found"});
        }else{
            return response.status(200).send({message: "Book Updated!"});
        }
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Route to delete a book
router.delete('/:id', async(request, response) => {
    try{
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id, request.body);
        if(!result){
            console.log(result)
            return response.status(404).send({message: "Book Not Found"});
        }else{
            return response.status(200).send({message: "Book Deleted!"});
        }
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
})

export default router;