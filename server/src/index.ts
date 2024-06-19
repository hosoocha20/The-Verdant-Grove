import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors';


import Bag from './models/Bag'
import User from './models/User'
import Product from "./models/Product";

require('dotenv').config()

const app = express();


//Express Middleware Function
app.use(cors(
    {
        origin: "*",
    }
));
// app.use(cors({
//     origin: "https://verdantgrove.com",
// }))
app.use(express.json());



const PORT = 5000;


app.get('/', async(req: Request, res: Response) => {
    res.send("hello world")
})
app.get('/products', async (req: Request, res: Response) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        console.log(err)
    }
})
app.get('/products/:category', async (req: Request, res: Response) => {
    const {category} = req.params;
    try{
        const products = await Product.find({category: category});
        
        res.json(products);
    }catch(err){
        console.log(err)
    }
})

//Search
app.get('/products/search/:keyword', async (req: Request, res: Response) => {
    const { keyword } = req.params;
    try{
        const products = await Product.find({name: {$regex: keyword, $options: 'i'}})
        console.log(products);
        res.json(products);
    }catch(err){
        console.error(err);
    }
})


//Admin Only
app.post("/products", async (req: Request, res: Response) => {
    console.log(req.body);
    try{
        const newProduct = new Product({
            name: req.body.name, 
            quantity: 1, 
            price: req.body.price, 
            imgMainSrc: req.body.imgMainSrc, 
            imgsSrc:req.body.imgsSrc, 
            description: req.body.description, 
            category: req.body.category, 
            productDetail: req.body.productDetail
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

