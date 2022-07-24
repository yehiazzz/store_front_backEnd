import app, {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'


const jwt_authintacate = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const headerAuth = req.headers.authorization
        const token = (headerAuth as string).split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as string)
        next()
    }catch(err){
        res.status(401)
        res.json(`Invalid token: ${err}`)
        return
    }
} 

export default jwt_authintacate