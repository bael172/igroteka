const Router = require("express")
const router = new Router()

const game = require("../queries/game")
//admin & user(dev only)
router.post("/add",game.add)
router.patch("/editId",game.edit)
//admin & user
router.get("/getId/:id",game.get_id)
router.get("/getName/:name",game.get_name)
router.get("/getGenre/:genre",game.get_genre)
router.get("/getSingleMultiplayer/:bool",game.get_singleMultiplayer)
router.get("/getAll",game.get_all)
//admin & user(dev only)
router.delete("deleteId",game.delete)

module.exports = router
