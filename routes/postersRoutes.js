const Router = require("express")
const router = new Router()

const poster = require("../queries/poster")

router.post("/add",poster.add)
router.patch("/edit",poster.edit)
router.get("/getId:id",poster.get_id)
router.get("/getGame",poster.get_game)

router.delete("/delete",poster.delete)