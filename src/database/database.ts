import moongose, { ConnectionOptions } from "mongoose";
import config from "../config/config";

const options: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  user: config.DB.USER,
  pass: config.DB.PASSWORD,
};

const dbConnection = async () => {
  try {
    await moongose.connect(config.DB.URI, options);
    console.log("DB Online");
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

export default dbConnection;
