import express, { Request, Response } from "express";

import cors from 'cors';
import User from "../models/User";

export async function deleteSelectedProducts(req: Request, res: Response) {
    const {email} = req.params;
    const query = {email: email};
    try{
        const users = await User.updateOne(query, {$pull: {cart: {checked : true}}, "new": true});
        const updated = await User.find(query);
        res.json(updated[0].cart);
    }catch(err){
        console.log(err)
    }


}