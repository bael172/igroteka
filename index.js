const express = require("express")
require('dotenv').config({path:'./db/.env'})

const sequelizeInstance = require("./db/index")

const PORT = process.env.PORT

const app = express()
app.use(express.json) //позволяет работать с json форматом

const start = async()=> {
    try{
        await sequelizeInstance.authenticate()
        await sequelizeInstance.sync()
        app.listen(PORT,()=>console.log(`Server start on ${PORT}`))
    }
    catch(err){
        console.err('Unable to connect to the database')
    }
}