import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Bag from './models/Bag'
import User from './models/User'
import Product from "./models/Product";

require('dotenv').config()

const app = express();


//Express Middleware Function
app.use(express.json());


const PORT = 5000;


app.get('/', async(req: Request, res: Response) => {
    res.send("hello world")
})

app.post("/products", async(req: Request, res: Response) => {
    console.log(req.body);
    try{
        const newProduct = new Product({
            productId: req.body.productId, 
            name: req.body.name, 
            quantity: 1, 
            price: req.body.price, 
            imgMainSrc: req.body.imgMainSrc, 
            imgsSrc:req.body.imgsSrc, 
            description: req.body.description, 
            category: req.body.category, 
            productDetail: {size: req.body.size, countrySrc: req.body.countrySrc}
        });
        const createdProduct = await newProduct.save();
        res.json(createdProduct);
    }catch(err){
        console.log(err)
    }
});

mongoose.connect(`${process.env.CONNECTION_STRING}`).then(() => {
    app.listen(`${PORT}`, ()=>{
        console.log(`listening to PORT ${PORT}`)
    });
});

