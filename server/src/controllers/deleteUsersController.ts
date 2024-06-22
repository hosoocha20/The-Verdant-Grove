import express, { Request, Response } from "express";

import cors from 'cors';
import User from "../models/User";

export async function deleteSelectedProducts(req: Request, res: Response) {
    const {email} = req.params;
    const query = {email: email};
    try{
        await User.updateOne(query, {$pull: {cart: {checked : true}}, "new": true});
        const updated = await User.find(query);
        res.json(updated[0].cart);
    }catch(err){
        console.log(err)
    }
}

export async function deleteCheckedOutProducts(req: Request, res: Response) {
    const {email} = req.params;
    try{
        await User.updateOne({email: email}, {"$pull" : {cart : {checked: true}}, "new":true});
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(500);
        console.log(err)
    }
}