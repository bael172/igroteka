const Router = require("express")
const router = new Router()

const user = require("../queries/user")

router.post("/registration",user.registration)
router.post("/login",user.login)
router.patch("/edit",user.edit)

router.get("/getId",user.get_id)
router.get("/getName",user.get_nickname)
router.get("/getEmail",user.get_email)

router.delete("/delete",user.delete)
router.post("/check",user.check)