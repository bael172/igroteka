const Router = require("express")
const router = new Router()

const dev_game = require("../queries/dev_game")

//admin
router.post("/add",dev_game.add)
router.patch("/edit",dev_game.edit)
router.get("/getOne",dev_game.get_one) //req.query
router.get("/getAll",dev_game.get_all) 
