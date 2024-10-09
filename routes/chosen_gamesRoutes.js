const Router = require("express")
const router = new Router()

const chosen_game = require("../queries/chosen_game")

router.post("/add",chosen_game.add)
router.edit("/edit",chosen_game.edit)

router.get("/getIdLibrary",chosen_game.get_id)
router.get("/getIdUser",chosen_game.get_id_user) //Выбор игр  у одного пользователя
router.get("/getIdGame",chosen_game.get_id_game) //Выбор пользователей с одной и той же игрой

router.delete("/delete",chosen_game.delete)
