const sequelize = require("sequelize")
const sequelizeInstance = require("./index")
const {DataTypes, Op} = require("sequelize")

const user = sequelizeInstance.define("user",{
    id_user:{type:DataTypes.INTEGER, primaryKey:true},
    nickname:{type:DataTypes.STRING, allowNull:false},
    bio:{type:DataTypes.STRING},
    email:{type:DataTypes.STRING},
    phone:{type:DataTypes.STRING},
    account_type:{type:DataTypes.STRING, defaultValue:"player"},
    money_rub:{type:DataTypes.INTEGER},
    status:{type:DataTypes.STRING}
})

const game = sequelizeInstance.define("game",{
    id_game:{type:DataTypes.INTEGER, primaryKey:true},
    name:{type:DataTypes.STRING, allowNull:false},
    bio:{type:DataTypes.STRING},
    genre:{type:DataTypes.STRING,allowNull:false},
    size_mb:{type:DataTypes.INTEGER,allowNull:false},
    download_url:{type:DataTypes.STRING,allowNull:false},
    global_rating:{type:DataTypes.DECIMAL(10,2)},
    publication_date:{type:DataTypes.DATE},
    last_update_date:{type:DataTypes.DATE},
    version:{type:DataTypes.STRING}
})

const review = sequelizeInstance.define("review",{
    id_cooment_game:{type:DataTypes.INTEGER, primaryKey:true},
    id_game:{type:DataTypes.INTEGER},
    id_user:{type:DataTypes.INTEGER},
    advantages:{type:DataTypes.STRING},
    disadvantages:{type:DataTypes.STRING},
    comment:{type:DataTypes.STRING},
    bugs:{type:DataTypes.STRING},
    publication_date:{type:DataTypes.DATE, allowNull:false},
    last_update_date:{type:DataTypes.DATE},
    score:{type:DataTypes.DECIMAL(10,2),allowNull:false},
    likes:{type:DataTypes.INTEGER, defaultValues:"0"},
    dislikes:{type:DataTypes.INTEGER, defaultValues:"0"}
})

const poster = sequelizeInstance.define("poster"{
    id_media:{type:DataTypes.UUID, primaryKey:true},
    id_game:{type:DataTypes.INTEGER},
    media_type:{type:DataTypes.STRING, allowNull:false, defaultValue="image"},
    media_name:{type:DataTypes.STRING, allownull:false},
    media_url:{type:DataTypes.STRING}
})

module.exports = {
    user,game,review, poster
}
