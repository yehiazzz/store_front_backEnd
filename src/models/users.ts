import client from "../database";
import bcrypt from 'bcrypt'
import dotenv from  'dotenv'
import { isParameterPropertyDeclaration } from "typescript";


dotenv.config()

export type user_type={
    id?:number;
    firstName:string;
    lastName:string;
    password:string;
}


export class Users{

    async index(): Promise<user_type[]>{
        try{
            const myConnection = await client.connect();
            const sql = `SELECT * FROM users`;
            const result = await myConnection.query(sql);
            myConnection.release();
            return result.rows
        }catch(err){
            throw new Error(`can't get users ${err}`)
        }

    }

    async show(id: number): Promise<user_type>{
        try{
            const myConnection = await client.connect();
            const sql = `SELECT * FROM users WHERE id = ($1)`;
            const result = await myConnection.query(sql,[id]);
            myConnection.release()
            return result.rows[0]
        }catch(err){
            throw new Error(`can't get user ${err}`)
        }

    }

    async create(user:user_type): Promise<user_type>{
        try{
            const myConnection = await client.connect();
            const sql = `INSERT INTO users (first_name, last_name, password_digest) VALUES ($1, $2, $3)`;
            
            const pepper = process.env.BCRYPT_PASSWORD
            const saltRounds = process.env.SALT_ROUND


            const hash = bcrypt.hashSync(
                user.password + pepper, 
                parseInt(saltRounds as string)
              );

            const result = await myConnection.query(sql,[user.firstName, user.lastName, hash]);
            myConnection.release()
            return user
        }catch(err){
            throw new Error(`can't create user ${err}`)
        }

    }

   async authonticate (currentUSer: user_type):Promise<user_type | null> {
        const myConnection = await client.connect();
        const sql = `SELECT password_digest FROM users WHERE first_name = ($1) AND last_name = ($2)`;
        const result = await myConnection.query(sql,[currentUSer.firstName, currentUSer.lastName]);
        myConnection.release()

        const pepper = process.env.BCRYPT_PASSWORD
        if(result.rows.length) {
            const verUser = result.rows[0]
            if(bcrypt.compareSync(currentUSer.password+pepper, verUser.password_digest))
            return verUser
        }
        return null
}
}