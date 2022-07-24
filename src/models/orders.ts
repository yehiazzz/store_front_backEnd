import { NumericLiteral } from "typescript";
import client from "../database";

export type order_type ={
    id?: number;
    status: string;
    user_id: number;

}

export class Order{

    // show orders for certain user id
    async show(user_id: number): Promise<order_type[]> {
        
        try {
            const myConnection = await client.connect();
            const sql = `SELECT * FROM orders WHERE user_id= ($1)`;
            const result = await myConnection.query(sql,[user_id])
            myConnection.release()
            
            return result.rows
            
        }catch (err){
            throw new Error(`can't get orders ${err}`)
        }
    }

    // show completes orders for certain user id
    async showCompleteOrders(user_id: number): Promise<order_type[]> {
        try {
            const myConnection = await client.connect();
            const sql = `SELECT * FROM orders WHERE user_id= ($1) AND status = 'complete'`;
            const result = await myConnection.query(sql,[user_id])
            myConnection.release()
            return result.rows
        }catch (err){
            throw new Error(`can't get orders ${err}`)
        }
    }

    // add products to order
    async addProduct (quantity:number, orderId: number, productId:number):Promise<order_type> {
        try{
            const myConnection = await client.connect();
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3)`
            const result = await myConnection.query(sql,[quantity, orderId, productId])
            myConnection.release()

            return result.rows[0]
        }catch (err){
            throw new Error(`can't add product ${err}`)
        }
    }

    
}