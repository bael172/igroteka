const Router = require("express")
const router = new Router()

const user = require("./usersRoutes")
/*
const game = require("./gamesRoutes")
const chosen_games = require("./chosen_gamesRoutes")
const dev_games = require("./dev_gamesRoutes")
const friends = require("./friendsRoutes")
const chat = require("./chatsRoutes")
const message = require("./messagesRoutes")
const poster = require("./postersRoutes")
const review = require("./reviewsRoutes")
const transaction = require("./transactionsRoutes")
const server = require("./serversRoutes")
*/

router.use("/user",user)
/*
router.use("/game",game)
router.use("/chosen_games",chosen_games)
router.use("/dev_games",dev_games)
router.use("/friends",friends)
router.use("/chat",chat)
router.use("/message",message)
router.use("/poster",poster)
router.use("/review",review)
router.use("/transaction",transaction)
router.use("/server",server)
*/

module.exports = router