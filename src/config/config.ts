export default {
  jwtSecret: process.env.JWT_SECRET || "SeCr37 k3y",
  DB: {
    URI: process.env.MONGODB_URI || "mongodb://localhost/tsauthjwt",
    USER: process.env.MONGODB_USER || "",
    PASSWORD: process.env.MONGODB_PASSWORD || "",
  },
};
