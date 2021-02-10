import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import dbConnection from "./database/database";

import passportMiddleware from "./middlewares/passport";
import authRouter from "./routes/auth.router";
import privateRouter from "./routes/private.router";

// Initializations
const app = express();
dbConnection();

// Settings
app.set("PORT", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.get(
  "/",
  (req: Request, res: Response): Response =>
    res.status(200).send(`API funcionando en: www.localhost:${app.get("PORT")}`)
);

app.use("/api/auth", authRouter);
app.use("/api/private", privateRouter);

export default app;
