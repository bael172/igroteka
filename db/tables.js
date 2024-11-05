const sequelizeInstance = require("./index")
const {DataTypes, Op} = require("sequelize")

const User = sequelizeInstance.define("user",{
    id_user:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    pfp:{type:DataTypes.STRING, defaultValue:"../pfp/default_icon.png"}, //URL-адрес до изображения аватара на сервере
    nickname:{type:DataTypes.STRING, allowNull:false},
    bio:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING, unique:true},
    phone:{type:DataTypes.STRING, unique:true},
    passwd:{type:DataTypes.STRING, allowNull:false},
    birthday:{type:DataTypes.DATEONLY, allowNull:false},
    account_type:{type:DataTypes.STRING, defaultValue:"player"}, //"dev","employee" 
    money_rub:{type:DataTypes.INTEGER, allowNull:false},
    status:{type:DataTypes.STRING}
})
const Chat = sequelizeInstance.define("chat",{
    id_chat:{type:DataTypes.INTEGER, primaryKey:true},
    id_sender:{type:DataTypes.INTEGER, references:{model:User, key:"id_user"}},
    id_receiver:{type:DataTypes.INTEGER, references:{model:User, key:"id_user"}},
    begin_date:{type:DataTypes.DATE, allowNull:false}
})
const Message = sequelizeInstance.define("message",{
    id_message:{type:DataTypes.INTEGER, primaryKey:true},
    id_chat:{type:DataTypes.INTEGER, references:{model:Chat, key:"id_chat"}},
    text:{type:DataTypes.STRING, allowNull:false},
    send_date:{type:DataTypes.DATE, allowNull:false},
    status:{type:DataTypes.STRING, allowNull:false}
})
const Friend = sequelizeInstance.define("friend",{
    id_request:{type:DataTypes.INTEGER, primaryKey:true},
    id_sender:{type:DataTypes.INTEGER, references:{model:User, key:"id_user"}},
    id_receiver:{type:DataTypes.INTEGER, references:{model:User, key:"id_user"}},
    status:{type:DataTypes.STRING, allowNull:false},
    send_date:{type:DataTypes.DATE, allowNull:false},
    receive_date:{type:DataTypes.DATE}
})
const Game = sequelizeInstance.define("game",{
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
const Review = sequelizeInstance.define("review",{
    id_cooment_game:{type:DataTypes.INTEGER, primaryKey:true},
    id_game:{type:DataTypes.INTEGER, references:{model:Game, key:"id_game"}},
    id_user:{type:DataTypes.INTEGER, references:{model:User, key:"id_user"}},
    advantages:{type:DataTypes.STRING},
    disadvantages:{type:DataTypes.STRING},
    comment:{type:DataTypes.STRING},
    publication_date:{type:DataTypes.DATE, allowNull:false},
    last_update_date:{type:DataTypes.DATE},
    rating:{type:DataTypes.DECIMAL(10,2),allowNull:false},
    likes:{type:DataTypes.INTEGER, defaultValues:"0"},
    dislikes:{type:DataTypes.INTEGER, defaultValues:"0"}
})
const Chosen_games = sequelizeInstance.define("chosen_game",{
    id_user:{type:DataTypes.INTEGER, primaryKey:true, references:{model:User, key:"id_user"}},
    id_game:{type:DataTypes.INTEGER, primaryKey:true, references:{model:Game, key:"id_game"}},
    added_date:{type:DataTypes.DATE},
    hours_played:{type:DataTypes.INTEGER},
    achievs_quantity:{type:DataTypes.INTEGER},
    game_price:{type:DataTypes.DECIMAL(10,2)},
    money_spent:{type:DataTypes.DECIMAL(10,2)}
})
const Poster = sequelizeInstance.define("poster",{
    id_media:{type:DataTypes.UUID, primaryKey:true},
    id_game:{type:DataTypes.INTEGER, references:{model:Game, key:"id_game"}},
    media_type:{type:DataTypes.STRING, allowNull:false, defaultValue:"image"},
    media_name:{type:DataTypes.STRING, allownull:false},
    media_url:{type:DataTypes.STRING}
})
const Server = sequelizeInstance.define("server",{
    id_vm:{type:DataTypes.INTEGER, primaryKey:true},
    ip_address:{type:DataTypes.INET},
    mac_address:{type:DataTypes.MACADDR},
    disk_capacity:{type:DataTypes.INTEGER},
    ram_memory:{type:DataTypes.INTEGER},
    throughput_capacity:{type:DataTypes.INTEGER},
    CPU_core_quantity:{type:DataTypes.INTEGER}
})
const Dev_game = sequelizeInstance.define("dev_game", {
    id_game:{type:DataTypes.INTEGER, primaryKey:true, references:{model:Game,key:"id_game"}},
    id_dev:{type:DataTypes.INTEGER, primaryKey:true, references: {model:User, key:"id_user"}},
    id_vm:{type:DataTypes.INTEGER, references:{model:Server, key:"id_vm"}},
    player_number_max:{type:DataTypes.INTEGER}
})
/*
const Transaction = sequelizeInstance.define("transaction",{
    hash:{type:DataTypes.UUID, primaryKey:true},
    id_user:{type:DataTypes.INTEGER, reference:{model:'user', key:'id_user'}},
    id_game:{type:DataTypes.INTEGER, reference:{model:'game', key:'id_game'}},
    type:{type:DataTypes.STRING, allowNull:false},
    total:{type:DataTypes.DECIMAL(10,2), allowNull:false},
    paid_by_user:{type:DataTypes.BOOLEAN},
    accepted_by_site:{type:DataTypes.BOOLEAN}
})
*/

User.hasMany(Dev_game, {
    foreignKey: 'id_dev'
})
User.hasMany(Friend, {
    foreignKey: 'id_receiver'
})
User.hasMany(Friend, {
    foreignKey: 'id_sender'
})

User.hasMany(Chat, {
    foreignKey: 'id_receiver'
})
User.hasMany(Chat, {
    foreignKey: 'id_sender'
})

User.hasMany(Review, {
    foreignKey: 'id_user'
})
User.hasMany(Chosen_games, {
    foreignKey: 'id_user'
})

Game.hasMany(Review, {
    foreignKey: 'id_game'
})
Game.hasMany(Chosen_games, {
    foreignKey: 'id_game'
})
Game.hasMany(Poster, {
    foreignKey: 'id_game'
})
Game.hasMany(Dev_game, {
    foreignKey: 'id_game'
})

Chat.hasMany(Message, {
    foreignKey: 'id_chat'
})

Server.hasOne(Dev_game, {
    foreignKey: 'id_vm'
})


module.exports = {
    User,Game,Review,Poster,Dev_game,Chosen_games,Message,Friend
}
