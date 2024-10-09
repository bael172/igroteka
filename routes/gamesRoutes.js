const Router = require("express")
const router = new Router()

const game = require("../queries/game")

router.post("/add",game.add)
router.patch("/editId",game.edit)

router.get("/getId",game.get_id)
router.get("/getName",game.get_name)
router.get("/getGenre",game.get_genre)
router.get("/getSingleMultiple",game.get_singleMultiplayer)
router.get("/getAll",game.get_all)

router.delete("deleteId",game.delete)

module.exports = router
