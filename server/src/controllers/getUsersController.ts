import express, { Request, Response } from "express";

import cors from 'cors';
import User from "../models/User";

export async function getUserOrders(req: Request, res: Response) {
    const {email} = req.params;
    try{
        const user = await User.find({email : email});
        const orders = user[0].orders;
        //console.log(orders)
        res.json(orders)
    }catch(err){
        console.log(err)
    }
}

export async function getUserDetails(req: Request, res: Response) {
    const {email} = req.params;
    try{
        const userDetails = await User.find({email: email}, {firstName:1, lastName:1, email: 1, address:1});
        //console.log("userDetails: ", userDetails);
        res.json(userDetails);

    }catch(err){
        console.log(err)
    }
}

export async function getUserCart(req: Request, res: Response){
    const {email} = req.params;
    try{
        const user = await User.find({email : email});
        const cart = user[0].cart;
        res.json(cart)
    }catch(err){
        console.log(err)
    }
}