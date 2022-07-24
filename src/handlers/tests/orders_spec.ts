import supertest from 'supertest'
import app from '../../server'
import { Order,order_type } from '../../models/orders'
import jwt from 'jsonwebtoken'
import { Users, user_type } from '../../models/users'

const request = supertest(app)
let token = ''
describe('test of orders routes', ()=> {

    // Test all orders by user
    it('should get all orders for user id',async ()=> {
        const newTestUser = new Users();
        const newUser:user_type = {
                    firstName: "First Test Name1",
                    lastName: 'last Test Name1',
                    password: 'testpassword1'
                    }

        const createNewUser = await request.post('/users')
        .send(newUser)
        token = jwt.sign({nUser: newUser},process.env.TOKEN_SECRET as string)

        const response = await request.get('/orders/1')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        const {id, user_id, status} = response.body[0]
        expect(status).toBe('active')

    })

    it('should retutn error because no JWT',async ()=> {
        const response = await request.get('/orders/1')
        expect(response.status).toBe(401)
    })

    // Test completes order by user
    it('should get all completes orders for user id',async ()=> {
        const response = await request.get('/orders/2/complete')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
        const {id, user_id, status} = response.body[1]
        expect(user_id).toBe(2)

    })

    it('should retutn error because no JWT',async ()=> {
        const response = await request.get('/orders/2/complete')
        expect(response.status).toBe(401)
    })


    // Test adding product to order
    it('should insert product into order id',async ()=> {
        const ProductID = 2;
        const qty = 555;

        const response = await request.post('/orders/1/products')
        .set('Authorization', `Bearer ${token}`)
        .send({
            "productID":ProductID,
            "qty": qty
        })
        expect(response.status).toBe(200)

    })

    it('should retutn error because no JWT',async ()=> {
        const ProductID = 2;
        const qty = 555;

        const response = await request.post('/orders/1/products')
        .send({
            "productID":ProductID,
            "qty": qty
        })
        expect(response.status).toBe(401)

    })


})