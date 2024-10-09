const Router = require("express")
const router = new Router()

const chosen_game = require("../queries/chosen_game")

//system
router.post("/add",chosen_game.add)
router.patch("/edit",chosen_game.edit) //req.query id_user id_game

//admin
router.get("/getIdLibrary",chosen_game.get_id) //req.query id_user id_game
router.get("/getIdUser/:id_user",chosen_game.get_id_user) //Выбор игр  у одного пользователя
router.get("/getAll",chosen_game.get_all)

//admin & user
router.get("/getIdGame/:id_game",chosen_game.get_id_game) //Выбор пользователей с одной и той же игрой

//user
router.get("/getMyGames",token,games.get_my_games)
router.delete("/deleteMyLibrary",token,games.delete_my_library)

//admin
router.delete("/delete",chosen_game.delete_id_library) //req.query id_user id_game
