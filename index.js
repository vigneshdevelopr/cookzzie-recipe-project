import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createConnection } from './Database/Mongodb.js';
import { userRouter } from './Routes/users.js';
import { recipeRouter } from './Routes/Recipes.js';
import path from 'path'
dotenv.config();




const app = express();
const PORT = process.env.port

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,'build')));
app.use('/users',userRouter)
app.use('/recipes', recipeRouter);



createConnection();

app.get('/',(req,res)=>{
    return res.status(200).json({message:"The Backend Server Database for Cookzzie Recipe Application"})
})
app.get('/*', function(req,res) {
    return res.sendFile(path.join(__dirname,'build','index.html'))
})

//listening:
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})