import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from 'cors';


import Bag from '../models/Bag'
import User from '../models/User'
import Product from "../models/Product";
import { createProductsController } from "../controllers/createProductsController";
import { getAllProductsController, getProductsByCatController, getProductsBySearchController } from "../controllers/getProductsController";
import { createUserController } from "../controllers/createUserController";


require('dotenv').config()

const app = express();
import bodyParser from 'body-parser';
import { authRefreshToken, authUserController, logout } from "../controllers/authUserController";
import { getUserCart, getUserDetails, getUserOrderDetails, getUserOrders } from "../controllers/getUsersController";
import  { putUserCartController, deleteUserCartItem, proceedToPay, putExisingUserCart, putUserDetailController, updateCartCheckAll, updateCartCheckSelect, updateCartQuantityByExisting, updateCartQuantityByVal, updateCartQuantityOne } from "../controllers/putUsersController";
import { deleteCheckedOutProducts, deleteSelectedProducts } from "../controllers/deleteUsersController";
import { verifyjwt } from "../middlewares/verifyjwt";

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
//Cart
app.get('/cart/:email', verifyjwt,getUserCart)
app.put('/cart/:email',verifyjwt, putUserCartController)
app.put('/cart/existingCart/:email', putExisingUserCart)
app.put('/cart/removeProduct/:email', verifyjwt,deleteUserCartItem)
app.delete('/cart/removeSelectedProducts/:email',verifyjwt, deleteSelectedProducts)
app.put('/cart/updateCheckAll/:email',verifyjwt, updateCartCheckAll)
app.put('/cart/updateCheckSelect/:email',verifyjwt, updateCartCheckSelect)
app.put('/cart/updateQuantityOne/:email',verifyjwt, updateCartQuantityOne)
app.put('/cart/updateQuantityByVal/:email',verifyjwt, updateCartQuantityByVal)
app.put('/cart/updateQuantityByExisting/:email',verifyjwt, updateCartQuantityByExisting)
//Checkout
app.get('/checkout/orderForm/:email',verifyjwt, getUserOrderDetails)
app.put('/checkout/proceedToPay/:email',verifyjwt, proceedToPay)
app.delete('/checkout/proceedToPay/:email',verifyjwt, deleteCheckedOutProducts)

//Add User
app.post("/register", createUserController)
//Login
app.post("/login", authUserController)

//Account
app.get("/account/orders/:email", verifyjwt,getUserOrders)
app.get("/account/profile/:email", verifyjwt,getUserDetails)
app.put("/account/profile/:email", putUserDetailController)

//Token
app.post("/refreshToken/:email", authRefreshToken)
app.delete("/logout", logout)

//Admin Only
app.post("/products", createProductsController);


mongoose.connect(`${process.env.CONNECTION_STRING}`).then(() => {
    app.listen(`${PORT}`, ()=>{
        console.log(`listening to PORT ${PORT}`)
    });
});

