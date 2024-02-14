import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Bag from './models/Bag'

require('dotenv').config()

const app = express();
const PORT = 5000;


app.get('/', (req: Request, res: Response) => {
    res.send("hello world")
})

mongoose.connect(`${process.env.CONNECTION_STRING}`).then(() => {
    app.listen(`${PORT}`, ()=>{
        console.log(`listening to PORT ${PORT}`)
    });
});

