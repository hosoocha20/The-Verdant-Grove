import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors';


import Bag from './models/Bag'
import User from './models/User'
import Product from "./models/Product";
import { createProductsController } from "./controllers/createProductsController";
import { getAllProductsController, getProductsByCatController, getProductsBySearchController } from "./controllers/getProductsController";
import { createUserController } from "./controllers/createUserController";


require('dotenv').config()

const app = express();
import bodyParser from 'body-parser';
import { authUserController } from "./controllers/authUserController";
import { getUserOrders } from "./controllers/getUsersController";

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
app.use(bodyParser.json());



const PORT = 5000;

//Shop
app.get('/', async(req: Request, res: Response) => {
    res.send("hello world")
})
app.get('/products', getAllProductsController)
app.get('/products/:category', getProductsByCatController)
//Search
app.get('/products/search/:keyword', getProductsBySearchController)

//Add User
app.post("/register", createUserController)
//Login
app.post("/login", authUserController)

//Account
app.get("/account/orders/:email", getUserOrders)

//Admin Only
app.post("/products", createProductsController);


mongoose.connect(`${process.env.CONNECTION_STRING}`).then(() => {
    app.listen(`${PORT}`, ()=>{
        console.log(`listening to PORT ${PORT}`)
    });
});

