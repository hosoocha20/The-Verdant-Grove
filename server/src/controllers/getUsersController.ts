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