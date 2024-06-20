import express, { Request, Response } from "express";

import cors from 'cors';
import Product from "../models/Product";

export async function createProductsController(req: Request, res: Response) {
    try{
        const newProduct = new Product({
            name: req.body.name, 
            quantity: 1, 
            price: req.body.price, 
            imgMainSrc: req.body.imgMainSrc, 
            imgsSrc:req.body.imgsSrc, 
            description: req.body.description, 
            category: req.body.category, 
            productDetail: req.body.productDetail
        });
        const createdProduct = await newProduct.save();
        res.json(createdProduct);
    }catch(err){
        console.log(err)
    }
}