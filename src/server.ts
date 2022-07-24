import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import orderStore from './handlers/orders'
import productStore from './handlers/products'
import userStore from './handlers/users'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

orderStore(app)
productStore(app)
userStore(app)



app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})



app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app
