import express from 'express'
import 'dotenv/config'
import Approutes from './routes/index.routes.js'
import cors from 'cors'
import {checkConnection} from './database/connectToDatabase.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(Approutes)
app.use(express.urlencoded({ extended: true ,limit:"32kb"}));
app.listen(process.env.PORT,async()=>
    {
    console.log(`Server is running PORT :`+ process.env.PORT)
    try {
        await checkConnection();
    } catch (error) {
        console.log("Connection Failure to Database !",error)
    }

}) 