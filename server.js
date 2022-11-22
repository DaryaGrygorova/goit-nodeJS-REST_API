const app = require("./app");
const mongoose = require("mongoose");
const path = require("path");
const {createFolderIsNotExist} = require("./helpers")

const { PORT, HOST_DB, UPLOAD_DIR_TMP, UPLOAD_DIR_AVATARS } = require("./config");

const start = async () => {
  try {
    if (!HOST_DB) {
      throw new Error("HOST_DB not set!");
    }

    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");

    await createFolderIsNotExist(path.join(__dirname, "./", UPLOAD_DIR_TMP));
    await createFolderIsNotExist(path.join(__dirname, "./", UPLOAD_DIR_AVATARS));

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1)
  }
};

start();
