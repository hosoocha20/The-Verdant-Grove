import express, { NextFunction, Request, Response } from "express";
import jwt , {JwtPayload} from 'jsonwebtoken';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
   }
export const verifyjwt = async (req: Request|any, res: Response, next: NextFunction) => {
    // try {
    //     const token = req.header('authorization')?.replace('Bearer ', '');
     
    //     if (!token) {
    //       throw new Error();
    //     }
     
    //      const decoded = jwt.verify(token, "secret");
    //      (req as CustomRequest).token = decoded;


     
    //     next();
    //   } catch (err) {
    //     res.status(401).send('Please authenticate');
    //   }
    const authHeader = req.header('authorization');
    if (authHeader) {
        const token = authHeader.replace('Bearer ', '');
        try{
            const decoded = jwt.verify(token, 'secret');
            (req as CustomRequest).token = decoded;
            next();
        }catch(err){
            return res.status(403).json("Token is invalid");
            
        }

    }else{
        res.status(401).json("You are not authenticated")
    }
}

