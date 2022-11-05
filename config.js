require("dotenv").config();

const PORT = process.env.PORT || 3000;
const HOST_DB = process.env.HOST_DB ||"mongodb+srv://User1:O38vt4aiWriXevYJ@cluster0.htjbfxt.mongodb.net/db-contacts?retryWrites=true&w=majority";

module.exports = {PORT, HOST_DB};