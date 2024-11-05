const {body} = require("express-validator")

const userDataValidate = [
    body("nickname")
    .exists({checkFalsy:true})
    .withMessage("Nickname is required")
    .isString()
    .withMessage("Nickname should be string")
    .custom((value) => {
        if(value.length >= 20){
            return Promise.reject("Nickname should be less than 20 digits")
        }
        else return true
    }),
    
    body("email")
    .exists({checkFalsy:true})
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Inputed value is not email"),
    
    body("phone")
    .optional()
    .custom((value)=>{
        let regexPhone = /\+?\d\d?\d? ?-?\d\d\d ?-?\d\d\d ?-?\d\d ?-?\d?\d?\d?/
        if(regexPhone.test(value)==false){
            return Promise.reject("Imputed value is not phone number")
        }
        else return true
    }),
    
    body("passwd")
    .exists({checkFalsy:true})
    .withMessage("Password is required")
    .isString()
    .withMessage("Password should be string")
    .isAlphanumeric()
    .withMessage("Password should contain only letters and numbers"),
    
    body("passwdAgain")
    .exists({checkFalsy:true})
    .withMessage("Password again is required")
    .isAlphanumeric()
    .withMessage("Password should contain only letters and numbers"),
    
    body("bio")
    .optional()
    .isString()
    .withMessage("Bio should be string"),

    body("birthday")
    .optional()
    .isDate()
    .withMessage("Imputed value should have Date format YYYY/MM/DD")
]

//module.exports = userDataValidate