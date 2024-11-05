const {User} = require("../db/tables")
const ApiError = require("../apiError")
const {validationResult} = require("express-validator")

const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')

const generateJwt = (id,name,email,phone,role,status="Null")=>{
    return jwt.sign(
        {id,name,email,phone,role,status}
    )
}
class User_Queries{
    async registration(req,res,next){
        const {nickname, email, phone, passwd, passwdAgain} = req.body
        if(!(nickname && passwd && passwdAgain) && !(email || phone)){
            res.status(401).json({message:'Введите почту или телефон, никнейм, пароль и пароль снова'})
            //next(ApiError.badRequest())
        }
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                errors: errors.array()
            })
        }
        const candidate_email = await User.findOne({
            where: email
        }).then(result=>{if(result)res.status(401).send("Пользователь с таким email уже существует")})
        const candidate_phone = await User.findOne({
            where: phone
        }).then(result=>{if(result)res.status(401).send("Пользователь с таким телефоном уже существует")})
        const candidate_nickname = await User.findOne({
            where: nickname
        }).then(result=>{if(result)res.status(401).send("Пользователь с таким ником уже существует")})
        if(passwd == passwdAgain){
            const hashPasswd = await bcrypt.hash(passwd,5)
            const user = await User.create({
                nickname, email, phone, passwd, passwdAgain
            })
            const token = generateJwt(user.id_user,user.nickname,user.email,user.phone,user.account_type)
            res.status(200).json({token})
        }
        else res.status(402).send("Пароли не совпадают")
    }

    async login(req,res,next){
        const {nickname, passwd} = req.body
        const user = await User.findOne({
            where: nickname
        })
        if(!user){
            res.status(403).send("Указан неверный nickname")
        }
        let comparePassword = bcrypt.compareSync(passwd, user.passwd)
        if(!comparePassword) {
            res.status(404).send("Указан неверный пароль")
        }
        const token = generateJwt(user.id_user,user.nickname,user.email,user.phone,user.account_type)
        res.status(200).json({token})
    }

    async check(req,res,next){
        const token = generateJwt(req.user.id_user,req.user.nickname,req.user.email,req.user.phone,req.user.account_type,req.user.status)
    }

    async edit(req,res,next){
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({
              success: false,
              errors: error.array(),
            });
          }
        const {nickname, bio, email, phone, birthday} = req.body
        const user = await User.findOne({
            where:{id_user:req.user.id_user}
        })
        if(user) {
            const [updatedRows, [updatedRecord]] = await user.update(
                {nickname,bio,email,phone,birthday},
                {returning:true})
            res.status(200).json({
                'Обновлено записей:':updatedRows,
                'Обновленная запись:':updatedRecord.dataValues})
        }
        else res.status(404).send("Запись о пользователе с таким id не найдена")
    }

    async changePfp(req,res,next){
        const {pfp} = req.body
        const [updatedRows, [updatedRecord]] = await User.update({pfp},{where:{id_user:req.user.id_user},returning:true})
        res.status(200).json('Обновлено записей:',updatedRows)
        res.status(200).json('Обновленная запись:',updatedRecord.dataValues)
    }

    async get_all(req,res,next){
        await User.findAll().then(response=>{
            if(response)res.status(200).json(response)
            else res.status(401).json("Нет ни одной записи")
            })
    }
    async get_one_where_id(req,res,next){
        await User.findOne({where:{
            id_user:req.params.id
        }}).then(result=>{
            if(result)res.status(200).json(result)
            else res.status(401).send(`Нет записи с таким ${req.user.email}`)
        })
    }
    async get_one_where_email(req,res,next){
        await User.findOne({where:{
            email:req.params.email
        }}).then(result=>{
            if(result)res.status(200).json(result)
            else res.status(401).send(`Нет записи с таким ${req.user.email}`)
        })
    }
    async get_one_where_nickname(req,res,next){
        await User.findOne({where:{
            nickname:req.params.nickname
        }}).then(result=>{
            if(result)res.status(200).json(result)
            else res.status(401).send(`Нет записи с таким ${req.user.nickname}`)
        })
    }
    async get_one_where_phone(req,res,next){
        await User.findOne({where:{
            phone:req.params.phone
        }}).then(result=>{
            if(result)res.status(200).json(result)
            else res.status(401).send(`Нет записи с таким ${req.user.phone}`)
        })
    }
    async get_all_where_status(req,res,next){
        await User.findAll({where:{status:req.params.status}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else res.status(401).send(`Нет пользователей ${req.params.status}`)
        })
    }
    async get_all_where_account_type(req,res,next){
        await User.findAll({where:{account_type:req.query.account_type}})
        .then(result=>{
            if(result) res.res.status(200).json(result)
            else res.status(401).send(`Нет пользвоателей с таким типом аккаунта`)
        })
    }
    async delete_by_id(req,res,next){
        const user = await User.findOne({where:{
            id_user:req.params.id
        }})
        if(user){await user.destroy()}
        else res.status(404).send(`Запись с id=${req.params.id} не найдена`)
    }
}

module.exports = new User_Queries()