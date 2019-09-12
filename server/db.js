const Sequelize = require("sequelize");

const sequelize = new Sequelize("koaauthtest", "root", "qwert12345", {
	host: "localhost",
	dialect: "mysql"
});

module.exports = {
	sequelize
};
