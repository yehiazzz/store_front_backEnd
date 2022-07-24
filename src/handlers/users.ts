import express, {Request, Response} from 'express'
import { user_type, Users } from '../models/users'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import jwt_authintacate from '../middlewares/jwt_auth'

dotenv.config()

export const store_users = new Users()

const index= async (req:Request, res:Response) => {
    try{
        const users = await store_users.index();
        res.json(users)
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const show =async (req:Request, res: Response) => {
    try{
        const users = await store_users.show(req.params.id as unknown as number);
        res.json(users)
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

const create =async (req:Request, res: Response) => {
    const userCreate: user_type ={
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    }

    try{
        const newUsers = await store_users.create(userCreate);
        var token = jwt.sign({nUser: newUsers},process.env.TOKEN_SECRET as string)
        res.json({"token":token})
    }catch(err){
        res.status(400)
        res.json(err)
    }
}

 const userStore = (app:express.Application)=>{
    app.get('/users',jwt_authintacate,index)
    app.get('/users/:id',jwt_authintacate,show)
    app.post('/users',create)

}

export default userStore