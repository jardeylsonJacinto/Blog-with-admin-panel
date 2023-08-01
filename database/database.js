const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const connection = new Sequelize(dbName, dbUser, dbPass, {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00"
});

module.exports = connection;
