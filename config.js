require("dotenv").config();

const config = {
  PORT: process.env.PORT || 3000,
  SERVER_HOST: process.env.SERVER_HOST || `http://localhost:3000`,
  HOST_DB: process.env.HOST_DB,
  HOST_DB_TEST: process.env.HOST_DB_TEST,
  SECRET_KEY: process.env.SECRET_KEY || 'SECRET_KEY',
  UPLOAD_DIR_TMP: "tmp",
  UPLOAD_DIR_AVATARS: "/public/avatars",
};

module.exports = config;