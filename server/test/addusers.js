const User = require("../model/user");

const { sequelize } = require("../db");

sequelize
	.authenticate()
	.then(() => {
		console.log("database connected");
	})
	.catch(err => {
		console.error("database connect failed" + err);
	});

sequelize
	.sync()
	.then(() => {
		console.log("init db ok");
	})
	.catch(err => {
		console.log("init db error", err);
	});

User.create({ username: "bbb", password: "bbb" });
