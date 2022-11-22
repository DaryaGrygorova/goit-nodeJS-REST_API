const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const {authRouter, contactsRouter} = require("./routes/api");
const {UPLOAD_DIR_AVATARS } = require("./config");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/avatars', express.static(`${UPLOAD_DIR_AVATARS}`));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log("App crashed!!!: ", err.stack);

  if (err.status) {
    return res.status(err.status).json({
      message: err.message,
    });
  }

  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
