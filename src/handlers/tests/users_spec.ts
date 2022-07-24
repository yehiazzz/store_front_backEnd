import supertest from 'supertest'
import app from '../../server'
import { Users, user_type } from '../../models/users';
import jwt from 'jsonwebtoken'

// const newTestUser = new Users();

const request = supertest(app)
let token =''
// let user_id = ''



// const testUserHandler =  store_users

describe('test of users routes', ()=> {


    const newUser:user_type = {
        firstName: "First Test Name1",
        lastName: 'last Test Name1',
        password: 'testpassword1'
    }
    
    //Test Create Route
    it('creat method should return token', async()=>{
        const response = await request.post('/users')
        .send(newUser)
        token = jwt.sign({nUser: newUser},process.env.TOKEN_SECRET as string)
        expect(response.status).toBe(200)
    })

    // Test Index Route
    it('Should get all users', async()=>{
        const response = await request.get('/users')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })

    it('Should show wrong status if the is no JWT', async()=>{
        const response = await request.get('/users')
        expect(response.status).toBe(401)
    })

    // Test Show id Route
    it('Should should return user with id 1', async()=>{
        const response = await request.get('/users/1')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200)
    })
        
})

