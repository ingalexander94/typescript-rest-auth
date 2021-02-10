import { Request, Response } from "express";

export const privateRoute = (req: Request, res: Response): Response => {
  return res.status(200).json({
    ok: true,
    msg: "Todo ok",
    user: req.user,
  });
};
