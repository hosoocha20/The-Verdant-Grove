import express, { Request, Response } from "express";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'


let refreshTokens = <String[]>[]

export async function authUserController(req: Request, res: Response) {
    const {email, pw} = req.body;
    try{
        const user = await User.find({email : email});
        //console.log(user);
        if (!user.length)
            return res.json({detail: "Account does not exist."})
        
        const success = await bcrypt.compare(pw, user[0].pw)
        const token = jwt.sign({ email }, 'secret', { expiresIn: "1h"})
        const refreshToken = jwt.sign({ email }, 'refreshSecret')
        refreshTokens.push(refreshToken);
        if (success){
            res.json({'email' : user[0].email, token, refreshToken})
        } else{
            res.json({detail: 'Your account or password is incorrect. Please try again.'})
        }
    }catch(err){
        console.log(err);
    }
}


export async function authRefreshToken(req: Request, res: Response) {
    //Take the refresh token from user
    const {refreshToken } = req.body
    const {email} = req.params;
    //send error if there is no token or it is invalid
    if (!refreshToken) return res.status(401).json("You are not authenticated")
        if(!refreshTokens.includes(refreshToken)){
            console.log("huh")
            return res.status(403).json("Refresh token is invalid")
        }
    //if everything ok, create new access token, refresh token and send to user
    try{
        jwt.verify(refreshToken, "refreshSecret");
        //refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

        const newAccessToken = jwt.sign({ email }, 'secret', { expiresIn: "30s"});
        //const newRefreshToken = jwt.sign({ email }, 'refreshSecret');

        //refreshTokens.push(newRefreshToken);

        res.status(200).json({token: newAccessToken})
    }catch(err){
        console.log(err)
    }
    
}

export async function logout(req: Request, res: Response){
    const {refreshToken} = req.body;
    refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).json("You logged out successfully")
}