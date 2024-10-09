const express = require("express")
require('dotenv').config({path:'./db/.env'})
const cors = require("cors")
const models = require("./db/tables")

const sequelize = require("./db/index")

const PORT = process.env.PORT

const router = require("./routes/index")
const app = express()
app.use(cors())
app.use(express.json) //позволяет работать с json форматом
app.use("/query",router)

const start = async()=> {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`Server start on ${PORT}`))
    }
    catch(e){
        console.log(e)
    }
}

start()