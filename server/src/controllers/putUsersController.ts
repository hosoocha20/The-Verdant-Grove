import express, { Request, Response } from "express";

import cors from 'cors';
import User from "../models/User";

export async function putUserDetailController(req: Request, res: Response){
    const {email} = req.params;
    const {firstName, lastName, address} = req.body;
    const query = {email : email};
    const update = {firstName: firstName, lastName: lastName, address: address};
    try{
        let user = await User.findOneAndUpdate(query, {$set: update}, {"fields": {firstName: 1, lastName: 1, email: 1, address: 1, _id: 0}, "new": true });
        //console.log("newUser: ", user);
        res.json(user);
    }catch(err){
        console.log(err)
    }
    
}

export default async function putUserCartController(req: Request, res: Response) {
    const {email} = req.params;
    const {product} = req.body;
    try{
        const user = await User.find({email : email});
        user[0].cart.push(product);
        await user[0].save();
        console.log(user[0].cart);
        res.json(user[0].cart)
    }catch(err){
        console.log(err)
    }
}

export async function deleteUserCartItem(req: Request, res: Response){
    const {email} = req.params;
    const {product} = req.body;
    const query = {email: email};
    try{
        await User.updateOne(query, {$pull: {cart: {name : product.name}}, "new": true});
        const updated = await User.find(query)
        res.json(updated[0].cart);
        
    }catch(err){
        console.log(err)
    }
}

export async function updateCartCheckAll(req: Request, res: Response){
    const {email} = req.params;
    const {state}: {state: Boolean} = req.body;
    const query = {email: email}
    try{
        await User.updateMany(query, {$set: {"cart.$[].checked" : state}, "new": true});
        const updated = await User.find(query)
        res.json(updated[0].cart);
    }catch(err){
        console.log(err)
    }
}

export async function updateCartCheckSelect(req: Request, res: Response){
    const {email} = req.params;
    const {product} = req.body;
    const query = {"email": email, "cart.name" : product.name}
    try{
        await User.updateOne(query, {$set : {"cart.$.checked" : !product.checked}, "new": true});
        const updated = await User.find({"email": email});
        res.json(updated[0].cart);
    }catch(err){
        console.log(err)
    }
}

export async function updateCartQuantityOne(req:Request, res: Response){
    const {email} = req.params;
    const {product, val} = req.body;
    const query = {"email": email, "cart.name" : product.name};
    try{
        await User.updateOne(query, {$set : {"cart.$.quantity" : product.quantity + val}, "new": true});
        const updated = await User.find({"email": email});
        res.json(updated[0].cart);
    }catch(err){
        console.log(err)
    }
}

export async function updateCartQuantityByVal(req:Request, res: Response){
    const {email} = req.params;
    const {product, val} = req.body;
    const query = {"email": email, "cart.name" : product.name};
    try{
        await User.updateOne(query, {$set : {"cart.$.quantity" : val}, "new": true});
        const updated = await User.find({"email": email});
        res.json(updated[0].cart);
    }catch(err){
        console.log(err)
    }
}

export async function proceedToPay(req: Request, res: Response){
    const {email} = req.params;
    const {orderDetail} = req.body;
    console.log(orderDetail);
    try{
        const user = await User.find({email : email});
        user[0].orders.push(orderDetail);
        await user[0].save();
        console.log(user[0].orders);
        res.sendStatus(200);
        //res.json(user[0].cart)
    }catch(err){
        console.log(err)
        res.sendStatus(500);
    }
}