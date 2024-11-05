const body = require("express-validator")

const gameDataValidate = [
    body("name")
    .exists({checkFalsy:true})
    .withMessage("Name is required")
    .isString()
    .withMessage("Name should be string")
    .isAlphanumeric()
    .withMessage("Name should be letters and numbers"),
    body("bio")
    .optional()
    .isString()
    .withMessage("Bio should be string")
    .isAlphanumeric()
    .withMessage("Bio should be letters and numbers"),
    body("genre")
    .optional()
    .isString()
    .withMessage("Genre should be string")
    .isAlphanumeric()
    .withMessage("Genre should be letters and numbers"),
    body("have_multiplayer")
    .exists({checkFalsy:true})
    .withMessage("Enter true or false")
]