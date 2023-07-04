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
    }
})

export const userModel = mongoose.model('users', userSchema);