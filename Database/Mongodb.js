import express from 'express';
import mongoose from 'mongoose';

function createConnection(){
    const params = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    try {
        mongoose.connect(process.env.mongourl, params);
        console.log('Your Database Connection has been created successfully')
    } catch (error) {
        console.log('Some Error has occured While Connecting to Database Connection')
    }
}
export {createConnection};