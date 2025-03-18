import express from 'express'
import 'dotenv/config'
import Approutes from './routes/index.routes.js'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())
app.use(Approutes)
app.use(express.urlencoded({ extended: true ,limit:"32kb"}));
app.listen(process.env.PORT,()=>
    {
    console.log(`App is listening PORT :`+ process.env.PORT
    )}) 