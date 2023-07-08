import express from 'express';
import jwt from 'jsonwebtoken';
import bcrpyt from 'bcrypt';
import { userModel } from '../Models/users.js';

const router = express.Router();

router.get('/', async(req,res)=>{
  try {
    const allUsers = await userModel.find();
    console.log(allUsers);
  return res.status(200).json({allUsers});
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
})

router.post('/signup',async(req, res)=>{
const{ username, password}=req.body;
const userRegister = await userModel.findOne({username})
try {
    if(userRegister){
        return res.status(409).json('Hey Dood, This User is Already Exists')
    }else{
        //hashing the password: 
const salt = await bcrpyt.genSalt(10)
        const hashPassword = await bcrpyt.hash(password,salt)
        console.log("hashPassword",hashPassword);

        const newUser = new userModel({
            username,
            password: hashPassword
        })
        await newUser.save();
        console.log('newUser',newUser);

        return res.status(200).json({message: 'Hey Dood, The New User was Added successfully'})

    }
} catch (error) {
    return res.status(500).json({message: 'Internal Server Error', error: error.message});
}
})

router.post('/signin',async(req, res)=>{
const{username, password}=req.body;
try {
    const user = await userModel.findOne({username});
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }
    const ValidatePassword = await bcrpyt.compare(password, user.password);
    console.log(ValidatePassword);
    if(!ValidatePassword){
        return res.status(401).json({message: 'Invalid Credentials'});
    }
    //generate Token:
    const genToken = jwt.sign({id: user._id},process.env.SecretKey);
    return res.status(200).json({token: genToken, userID: user._id, user:user.username});
} catch (error) {
    return res.status(500).json('Internal Server Error during Login process')
}
})

export const userRouter = router;