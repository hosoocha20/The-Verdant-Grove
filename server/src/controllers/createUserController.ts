import express, { Request, Response } from "express";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import User from '../models/User'



export async function createUserController(req: Request, res: Response) {
    const { firstName, lastName,email, pw, cart} = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPw = bcrypt.hashSync(pw, salt);
    try{
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            pw: hashedPw,
            cart: cart
        })
        const token = jwt.sign({ email }, 'secret', {expiresIn: '1hr'})
        res.json({ email, token})
    }catch(err){
        console.log(err)
        if (err) {
            res.json({ detail: 'An account with this email already exists.'})
          }
    }
}