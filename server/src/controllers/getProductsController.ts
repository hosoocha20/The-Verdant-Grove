import express, { Request, Response } from "express";

import cors from 'cors';
import Product from "../models/Product";

export async function getAllProductsController(req: Request, res: Response) {
    try{
        const products = await Product.find();
        res.json(products);
    }catch(err){
        console.log(err)
    }
}

export async function getProductsByCatController(req: Request, res: Response) {
    const {category} = req.params;
    try{
        const products = await Product.find({category: category});
        
        res.json(products);
    }catch(err){
        console.log(err)
    }
}

export async function getProductsBySearchController(req: Request, res: Response) {
    const { keyword } = req.params;
    try{
        const products = await Product.find({name: {$regex: keyword, $options: 'i'}})
        //console.log(products);
        res.json(products);
    }catch(err){
        console.error(err);
    }
}