
// for sending request
const request = require('supertest')

// server main file (index.js)
const app = require('../index')

// Making test collections
describe('Api Test Collection', () => {

    // Test case 1 (/test)
    it('GET /test | Response text', async () => {
        
        // Making api request to /test
        const response = await request(app).get('/test');

        // our response should have 200 status code
        expect(response.statusCode).toBe(200)

        // expect text
        expect(response.text).toEqual('Test Api is Working ...!')

    })


    // Register api (post)
    it('POST /api/user/create | Response with message', async () => {
        const response = await request(app).post('/api/user/create').send({
            "firstName" : "John",
            "lastName" : "Cena",
            "email" : "john@gmail.com",
            "password":"123"
        })

        console.log(response.body)

        // if already exists
        if(!response.body.success){
            expect(response.body.message).toEqual('User Already Exists!')
        } else{
            expect(response.statusCode).toBe(200)
        expect(response.body.message).toEqual('User Created Successfully!')
        }

        

        
    })

    // test login function
    it('POST /api/user/login | Response with message', async () => {
        
    })
  
})
