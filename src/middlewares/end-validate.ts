import { validationResult } from "express-validator";
import { Request, Response, NextFunction} from 'express'

export const endValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            msg: "Error en la petición",
            errors: errors.mapped()
        });
    }
    next();
}