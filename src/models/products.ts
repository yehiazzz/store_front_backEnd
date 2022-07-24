import client from "../database";

export type product_type ={
    id?: number;
    name: string;
    price: number;
    category?: string;
}

export class Product{
     async index(): Promise<product_type[]> {
        try {
            const myConnection = await client.connect();
            const sql = 'SELECT * FROM products';
            const result = await myConnection.query(sql)
            myConnection.release()
            return result.rows
        }catch (err){
            throw new Error(`can't get products ${err}`)
        }
    }

    async show(id: number): Promise<product_type> {
        try {
            const myConnection = await client.connect();
            const sql = `SELECT * FROM products WHERE id= ($1)`;
            const result = await myConnection.query(sql,[id])
            myConnection.release()
            return result.rows[0]
        }catch (err){
            throw new Error(`can't get product ${err}`)
        }
    }

    async create(product:product_type): Promise<product_type> {
        try {
            const myConnection = await client.connect();
            const sql = `INSERT INTO products (name, price, category) VALUES ($1, $2, $3)`;
            const result = await myConnection.query(sql,[product.name, product.price, product.category])
            myConnection.release()
            return product
        }catch (err){
            throw new Error(`can't create product ${err}`)
        }
    }

}