const Router = require("express")
const router = new Router()

const chat = require("../queries/chat")

//admin & user
router.post("/add",chat.add)

//system
router.patch("/edit/:id_chat",chat.edit)

//admin 
router.get("/getId/:id_chat",chat.get_id)
router.get("/getIdInit/:id_init",chat.get_id_initializator)
router.get("/getAll")

//admin & user
router.delete("/deleteId/:id",chat.delete_id)

//user
router.get("/getMyChat/:recent",token,chat.get_my_chat) //последний чат
router.get("/getAllChats",token,chat.get_all_my_chats) //все чаты
