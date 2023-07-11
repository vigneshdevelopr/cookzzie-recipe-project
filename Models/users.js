import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true,
    },
    savedRecipes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'recipes'  
    }]
})

export const userModel = mongoose.model('users', userSchema);