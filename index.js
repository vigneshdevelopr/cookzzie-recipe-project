import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createConnection } from './Database/Mongodb.js';
import { userRouter } from './Routes/users.js';
dotenv.config();




const app = express();
const PORT = process.env.port

//middleware
app.use(cors());
app.use(express.json());
app.use('/users',userRouter)



createConnection();

app.get('/',(req,res)=>{
    return res.status(200).json({message:"The Backend Server Database for Cookzzie Recipe Application"})
})

//listening:
app.listen(PORT, ()=>{
    console.log(`Server listening on ${PORT}`);
})