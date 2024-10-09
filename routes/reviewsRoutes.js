const Router = require("express")
const router = new Router()

const review = require("../queries/review")

router.post("/add",review.add)
router.patch("/editId",review.edit)

router.get("/getId",review.get_id)
router.get("/getIdGame",review.get_id_game)
router.get("/getIdUser",review.get_id_user)
