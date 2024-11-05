const {Game} = require("../db/tables.js")
const ApiError = require("../apiError.js")
const {Op} = require("sequelize")

class Game_Queries{
    async add(req,res,next){
        const {name,bio,genre,have_multiplayer,download_url} = req.body
        const exist = await Game.findOne({where:{name}})
        if(exist) {
            const added = await Game.create({name, bio, genre, have_multiplayer, download_url})
            .then(response=>res.status(200).json(response))
        }
        else res.status(401).send("Игра с таким названием уже существует")


    }
    async edit(req,res,next){
        const {name,bio,genre,download_url} = req.body
        const find_game = await Game.findOne({where:{name:req.params.name}})
        if(find_game) {
            const [updatedRows, [edited]] = await find_game.update({name,bio,genre,download_url})
            res.status(200).json({
                'Обновлено записей:':updatedRows,
                'Обновленная запись':edited.dataValues
            })
        }
        else res.status(404).send("Игра с таким названием не существует")
    }
    async get_all(req,res,next){
        await Game.findAll().then(response=>{
            if(response)res.status(200).json(response)
            else res.status(401).json("Нет ни одной записи")
            })
    }
    async get_one_where_id(req,res,next){
        await Game.findOne({where:{
            id_game:req.params.id
        }}).then(result=>{
            if(result)res.status(200).json(result)
            else res.status(401).send(`Нет записи с id_game = ${req.params.id}`)
        })
    }
    async get_one_where_name(req,res,next){
        await Game.findOne({where:{
            name:req.params.name
        }}).then(result=>{
            if(result)res.status(200).json(result)
            else res.status(401).send(`Нет записи с name = ${req.params.name}`)
        })
    }
    async get_all_where_genre(req,res,next){
        await Game.findAll({where:{genre:req.params.genre}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else res.status(401).send(`Нет игр с жанром =  ${req.params.genre}`)
        })
    }    
    async get_all_where_have_multiplayer_true(req,res,next){
        await Game.findAll({where:{have_multiplayer:req.params.have_multiplayer}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else if(req.params.have_multiplayer==true)res.status(401).send(`Нет многопользовательских игр`)
                else res.status(401).send(`Нет одиночных игр`)
        })
    }
    async get_all_where_download_url(req,res,next){
        await Game.findAll({where:{download_url:{[Op.notIn]:[""," ",null,undefined]}}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else res.status(401).send("Нет игр для скачивания")
        })
    }
    async get_all_where_UP_global_raiting(req,res,next){
        await Game.findAll({where:{global_raiting:{[Op.gte]:req.params.rateUP}}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else res.status(401).send(`Нет игр с рейтингом выше чем ${req.params.rateUP}`)
        })
    }
    async get_all_where_rate_UP(req,res,next){
        await Game.findAll({where:{global_raiting:{[Op.gte]:req.params.rateUP}}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else res.status(401).send(`Нет игр с рейтингом выше чем ${req.params.rateUP}`)
        })
    }
    async get_all_where_rate_DOWN(req,res,next){
        await Game.findAll({where:{global_raiting:{[Op.lte]:req.params.rateUP}}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else res.status(401).send(`Нет игр с рейтингом ниже чем ${req.params.rateUP}`)
        })
    }
    async get_all_where_rate_BETWEEN(req,res,next){
        await Game.findAll({where:{global_raiting:{[Op.between]:[req.query.from,req.query.to]}}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else res.status(401).send(`Нет игр с рейтингом в диапозоне от ${req.query.from} до ${req.query.to}`)
        })
    }
    async delete_by_id(req,res,next){
        const Game = await Game.findOne({where:{
            id_Game:req.params.id
        }})
        if(Game){await Game.destroy()}
        else res.status(404).send(`Запись с id=${req.params.id} не найдена`)
    }
}