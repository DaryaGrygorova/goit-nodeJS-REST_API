const express = require("express");
const {tryCatchWrapper} = require("../../middleware");
const {login, logout, signup, getCurrent} = require("../../controllers/auth.controller");
const {validation, auth} = require('../../middleware');
const { userAuthSchema } = require("../../validationSchemas");

const router = express.Router();

router.post("/signup", validation(userAuthSchema), tryCatchWrapper(signup));
router.post("/login", validation(userAuthSchema), tryCatchWrapper(login));
router.get("/current", auth, tryCatchWrapper(getCurrent));
router.patch("/logout", auth, tryCatchWrapper(logout));

module.exports = router;
