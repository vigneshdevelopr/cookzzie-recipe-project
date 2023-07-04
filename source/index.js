import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createConnection } from '../Database/Mongodb.js';
import { userRouter } from '../source/Routes/users.js';
dotenv.config();




const app = express();
const PORT = process.env.port

//middleware
app.use(cors());
app.use(express.json());
app.use('/users',userRouter)



createConnection();
//listening:
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})