const path = require("path");
const Sequelize = require("sequelize");

// const sequelize = new Sequelize("koaauthtest", "root", "qwert12345", {
// 	host: "localhost",
// 	dialect: "mysql"
// });

const sequelize = new Sequelize(undefined, undefined, undefined, {
	host: "localhost",
	dialect: "sqlite",
	storage: path.join(__dirname, "./test/database/nuxtauth.sqlite")
});

module.exports = {
	sequelize
};
