import express, { Request, Response } from "express";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import User from '../models/User'

export async function authUserController(req: Request, res: Response) {
    const {email, pw} = req.body;
    try{
        const user = await User.find({email : email});
        console.log(user);
        if (!user.length)
            res.json({detail: "Account does not exist."})
        
        const success = await bcrypt.compare(pw, user[0].pw)
        const token = jwt.sign({ email }, 'secret', { expiresIn: '1h'})
        if (success){
            res.json({'email' : user[0].email, token})
        } else{
            res.json({detail: 'Your account or password is incorrect. Please try again.'})
        }
    }catch(err){
        console.log(err);
    }
}