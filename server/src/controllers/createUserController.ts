import express, { Request, Response } from "express";

import cors from 'cors';
import User from '../models/User'

export async function createUserController(req: Request, res: Response) {
    const {email, pw, firstName, lastName} = req.body;
    try{
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            pw: pw
        })
    }catch(err){
        console.log(err)
    }
}