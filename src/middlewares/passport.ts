import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import config from "../config/config";
import User from "../database/models/User";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(options, async ({ id }, done) => {
  try {
    const user = await User.findById(id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    console.error(error);
  }
});
