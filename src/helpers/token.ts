import jwt from "jsonwebtoken";
import config from "../config/config";
import { IUser } from "../interfaces/IUser";

export const generateToken = (user: IUser): Promise<String> => {
  return new Promise((resolve, reject) => {
    const payload = { id: user.id, email: user.email };
    jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: "1h",
      },
      (err, token = "") => {
        if (err) reject("No se pudo generar el token");
        else resolve(token);
      }
    );
  });
};
