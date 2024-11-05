const Router = require("express")
const router = new Router()
const userDataValidate = require("../validation/validateUser")

const user = require("../queries/user")

router.post("/registration",userDataValidate,user.registration)
router.post("/login",userDataValidate,user.login)
router.patch("/edit",userDataValidate,user.edit)
router.patch("/changePfp",user.changePfp)

router.get("/getById",user.get_one_where_id)
router.get("/getByName=:nickname",user.get_one_where_nickname)
router.get("/getByEmail=:email",user.get_one_where_email)
router.get("/getByPhone=:phone",user.get_one_where_phone)
router.get("/getAll",user.get_all)

router.delete("/delete=:id",user.delete_by_id)
router.post("/check",user.check)

module.exports = router