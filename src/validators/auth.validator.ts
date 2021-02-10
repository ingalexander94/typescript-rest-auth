import { check } from "express-validator";
import { endValidation } from "../middlewares/end-validate";

const registerValidate = () => {
    return [
        check("name","El Nombre es obligatorio").not().isEmpty(),
        check("email","El Correo es obligatorio").isEmail(),
        check("password","La Clave debe tener mínimo 6 caracteres").isLength({min:6}),
        endValidation
    ]
}

const loginValidate = () => {
    return [
        check("email","El Correo es obligatorio").isEmail(),
        check("password","La Clave debe tener mínimo 6 caracteres").isLength({min:6}),
        endValidation
    ]
}

export {
    registerValidate,
    loginValidate
}