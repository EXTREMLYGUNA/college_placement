import mongoose from 'mongoose'
import config from '../utils/config.js'
import mysql2 from 'mysql2/promise';
import dotenv from 'dotenv'

main().catch(error => console.log('MongoDB connection Failed', error));
async function main(){
    await mongoose.connect(`${config.DB_URL}/${config.DB_NAME}`)
    console.log("Mongoose connected successfully ...")
}

dotenv.config()

const pool = mysql2.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true
})

const checkConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log("Database MySQL is connected ...")
        connection.release();
    } catch (error) {
        console.log("Connection Failure !")
        throw error
    }
}

export {mongoose,
pool,checkConnection}