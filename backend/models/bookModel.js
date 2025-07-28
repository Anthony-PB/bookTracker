import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minLength: 3,
            maxLength: 20,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },

    },
    {
        timestamps: true,
    }
)

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
        
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        }
    },
    {
        timestamps: true,
    }
);

// Before saving a user, hash the password
// Why this is good to do?
// It ensures that the password is stored securely in the database.
// We don't need to have separate logic for hashing passwords in the routes.
// Instead, we can use Mongoose middleware to handle this automatically.
// Cases: Registration, password change, etc.
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt = await bcryptjs.genSalt(10);
        this.password = await bcryptjs.hash(this.password, salt);
        next();
    } catch(error){
        console.error(error);
        next(error);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
}

export const Book = mongoose.model('Book',bookSchema);
export const User = mongoose.model('User', userSchema);