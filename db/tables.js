const sequelizeInstance = require("./index")
const {DataTypes, Op} = require("sequelize")

const user = sequelizeInstance.define("user",{
    id_user:{type:DataTypes.INTEGER, primaryKey:true},
    pfp:{type:DataTypes.STRING}, //URL-адрес до изображения аватара на сервере
    nickname:{type:DataTypes.STRING, allowNull:false},
    bio:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    birthday:{type:DataTypes.DATE, allowNull:false},
    account_type:{type:DataTypes.STRING, defaultValue:"player"}, //"dev","employee" 
    money_rub:{type:DataTypes.INTEGER, allowNull:false},
    status:{type:DataTypes.STRING}
})
const chat = sequelizeInstance.define("chat",{
    id_chat:{type:DataTypes.INTEGER, primaryKey:true},
    id_initializar:{type:DataTypes.INTEGER,  references:{model:user, key:"id_user"}},
    id_receiver:{type:DataTypes.INTEGER, references:{model:user, key:"id_user"}},
    begin_date:{type:DataTypes.DATE, allowNull:false}
})
const message = sequelizeInstance.define("message",{
    id_message:{type:DataTypes.INTEGER, primaryKey:true},
    id_chat:{type:DataTypes.INTEGER, references:{model:chat, key:"id_chat"}},
    text:{type:DataTypes.STRING, allowNull:false},
    send_date:{type:DataTypes.DATE, allowNull:false},
    status:{type:DataTypes.STRING, allowNull:false}
})
const friend = sequelizeInstance.define("friend",{
    id_request:{type:DataTypes.INTEGER, primaryKey:true},
    id_sender:{type:DataTypes.INTEGER,  references:{model:user, key:"id_user"}},
    id_receiver:{type:DataTypes.INTEGER, references:{model:user, key:"id_user"}},
    status:{type:DataTypes.STRING, allowNull:false},
    send_date:{type:DataTypes.DATE, allowNull:false},
    receive_date:{type:DataTypes.DATE}
})
const game = sequelizeInstance.define("game",{
    id_game:{type:DataTypes.INTEGER, primaryKey:true},
    name:{type:DataTypes.STRING, allowNull:false},
    bio:{type:DataTypes.STRING},
    genre:{type:DataTypes.STRING,allowNull:false},
    have_multiplayer:{type:DataTypes.BOOLEAN},
    size_mb:{type:DataTypes.INTEGER,allowNull:false},
    download_url:{type:DataTypes.STRING,allowNull:false},
    global_rating:{type:DataTypes.DECIMAL(10,2)},
    publication_date:{type:DataTypes.DATE},
    last_update_date:{type:DataTypes.DATE},
    version:{type:DataTypes.STRING}
})
const review = sequelizeInstance.define("review",{
    id_cooment_game:{type:DataTypes.INTEGER, primaryKey:true},
    id_game:{type:DataTypes.INTEGER, references:{model:game, key:"id_game"}},
    id_user:{type:DataTypes.INTEGER, references:{model:user, key:"id_user"}},
    advantages:{type:DataTypes.STRING},
    disadvantages:{type:DataTypes.STRING},
    comment:{type:DataTypes.STRING},
    publication_date:{type:DataTypes.DATE, allowNull:false},
    last_update_date:{type:DataTypes.DATE},
    rating:{type:DataTypes.DECIMAL(10,2),allowNull:false},
    likes:{type:DataTypes.INTEGER, defaultValues:"0"},
    dislikes:{type:DataTypes.INTEGER, defaultValues:"0"}
})
const chosen_games = sequelizeInstance.define("chosen_game",{
    id_user:{type:DataTypes.INTEGER, primaryKey:true, references:{model:user, key:"id_user"}},
    id_game:{type:DataTypes.INTEGER, primaryKey:true, references:{model:game, key:"id_game"}},
    added_date:{type:DataTypes.DATE},
    hours_played:{type:DataTypes.INTEGER},
    achievs_quantity:{type:DataTypes.INTEGER},
    game_price:{type:DataTypes.DECIMAL(10,2)},
    money_spent:{type:DataTypes.DECIMAL(10,2)}
})
const poster = sequelizeInstance.define("poster",{
    id_media:{type:DataTypes.UUID, primaryKey:true},
    id_game:{type:DataTypes.INTEGER, references:{model:game, key:"id_game"}},
    media_type:{type:DataTypes.STRING, allowNull:false, defaultValue:"image"},
    media_name:{type:DataTypes.STRING, allownull:false},
    media_url:{type:DataTypes.STRING}
})
const server = sequelizeInstance.define("server",{
    ip_address_VM:{type:DataTypes.INET,primaryKey:true},
    ip_address:{type:DataTypes.INET},
    mac_address:{type:DataTypes.MACADDR},
    disk_capacity:{type:DataTypes.INTEGER},
    ram_memory:{type:DataTypes.INTEGER},
    throughput_capacity:{type:DataTypes.INTEGER},
    CPU_core_quantity:{type:DataTypes.INTEGER}
})
const dev_game = sequelizeInstance.define("dev_game", {
    id_game:{type:DataTypes.INTEGER, primaryKey:true, references:{model:game,key:"id_game"}},
    id_dev:{type:DataTypes.INTEGER, primaryKey:true, references: {model:user, key:"id_user"}},
    ip_address_VM:{type:DataTypes.INET, primaryKey:true, references:{model:server, key:"ip_address_VM"}},
    player_number_max:{type:DataTypes.INTEGER}
})
const transaction = sequelizeInstance.define("transaction",{
    hash:{type:DataTypes.UUID, primaryKey:true},
    id_user:{type:DataTypes.INTEGER, reference:{model:'user', key:'id_user'}},
    id_game:{type:DataTypes.INTEGER, reference:{model:'game', key:'id_game'}},
    type:{type:DataTypes.STRING, allowNull:false},
    total:{type:DataTypes.DECIMAL(10,2), allowNull:false},
    paid_by_user:{type:DataTypes.BOOLEAN},
    accepted_by_site:{type:DataTypes.BOOLEAN}
})

user.hasMany(dev_game, {
    foreignKey: 'id_dev'
})
user.hasMany(friend,{
    foreignKey: 'id_receiver'
})
user.hasMany(chat, {
    foreignKey: 'id_receiver'
})
user.hasMany(review, {
    foreignKey: 'id_user'
})
user.hasMany(chosen_games, {
    foreignKey: 'id_user'
})

game.hasMany(review, {
    foreignKey: 'id_game'
})
game.hasMany(chosen_games, {
    foreignKey: 'id_game'
})
game.hasMany(poster, {
    foreignKey: 'id_game'
})
game.hasMany(dev_game, {
    foreignKey: 'id_game'
})

chat.hasMany(message, {
    foreignKey: 'id_chat'
})

server.hasOne(dev_game, {
    foreignKey: 'ip_address_VM'
})

module.exports = {
    user,game,review,poster,dev_game,chosen_games,message,friend,transaction
}
