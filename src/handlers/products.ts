import express, { Request,Response } from "express";
import { product_type, Product } from "../models/products";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import jwt_authintacate from "../middlewares/jwt_auth";

const store_products = new Product()

const index= async (req:Request, res:Response) => {
    try{
        const products = await store_products.index();
        res.json(products)
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const show =async (req:Request, res: Response) => {
    try{
        const products = await store_products.show(req.params.id as unknown as number);
        res.json(products)
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const create =async (req:Request, res: Response) => {
    try{
        const productCreate: product_type ={
            name: req.body.name,
            price: req.body.price,
            category:req.body.category
        }
        const newProducts = await store_products.create(productCreate);
        res.status(200)
        res.json(newProducts)
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

    

 const productStore = (app:express.Application)=>{
    app.get('/products',index)
    app.get('/products/:id',show)
    app.post('/products',jwt_authintacate,create)

}

export default productStore