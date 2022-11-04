const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { PORT = 3000, HOST_DB } = process.env;

const start = async () => {
  try {
    if (!HOST_DB) {
      throw new Error("HOST_DB not set!");
    }

    await mongoose.connect(HOST_DB);
    console.log("Database connection successful");
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1)
  }
};

start();
