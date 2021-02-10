import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import User from "../database/models/User";
import { generateToken } from "../helpers/token";

const register = async (req: Request, res: Response): Promise<Response> => {
  const { name, email, password }: IUser = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        ok: false,
        msg: "Usuario ya existe",
      });
    }
    user = new User({ name, email, password });
    await user.save();
    const token = await generateToken(user);
    return res.status(200).json({
      ok: true,
      msg: "Usuario creado",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { email, password }: IUser = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Usuario no existe",
      });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid)
      return res.status(401).json({ ok: false, msg: "Contraseña incorrecta" });
    const token = await generateToken(user);
    return res.status(200).json({
      ok: true,
      msg: "Bienvenido!",
      user,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      msg: "Hable con el Administrador",
    });
  }
};

export { login, register };
