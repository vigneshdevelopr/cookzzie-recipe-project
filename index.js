import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createConnection } from './Database/Mongodb.js';
import { userRouter } from './Routes/users.js';
import { recipeRouter } from './Routes/Recipes.js';
dotenv.config();




const app = express();
const port = process.env.port||3001

//middleware
app.use(cors());
app.use(express.json());
app.use('/users',userRouter)
app.use('/recipes', recipeRouter);



createConnection();

app.get('/',(req,res)=>{
    return res.status(200).send("The Backend Server Database for Cookzzie Recipe Application")
})


// Listen on `port` and 0.0.0.0
app.listen(port, "0.0.0.0", function () {
console.log(`your server will connected to port: ${port}`)
});