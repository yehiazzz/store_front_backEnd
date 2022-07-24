import supertest from 'supertest'
import app from '../../server'
import { Product,product_type } from '../../models/products'
import jwt from 'jsonwebtoken'
import { Users, user_type } from '../../models/users'

const request = supertest(app)

describe('tests of product routes', ()=> {

    const newProduct: product_type={
        name: 'testProdcut',
        price: 105,
        category: 'testCategory'
    }

    // Test index route
    it('Should return all products',async () => {
        const response = await request.get('/products')
        expect(response.status).toBe(200)
        const {id, name, price, category} = response.body[1]
        expect(name).toBe('laptop')
    })

    // Test show product by id route
    it('Should return all products',async () => {
        const response = await request.get('/products/1')
        expect(response.status).toBe(200)
        const {id, name, price, category} = response.body
        expect(name).toBe('Camera')
    })

    // Test Create product
    it('Should return all products',async () => {

        const newTestUser = new Users();
        const newUser:user_type = {
                    firstName: "First Test Name1",
                    lastName: 'last Test Name1',
                    password: 'testpassword1'
                    }

        const createNewUser = await request.post('/users')
        .send(newUser)
        const token = jwt.sign({nUser: newUser},process.env.TOKEN_SECRET as string)

        const response = await request.post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(newProduct)
        expect(response.status).toBe(200)

    })

    it('Should return status error because there is no jwt',async () => {
        
        const response = await request.post('/products')
        .send(newProduct)
        expect(response.status).toBe(401)

    })

})