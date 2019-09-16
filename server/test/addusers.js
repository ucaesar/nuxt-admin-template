const User = require("../model/user");

const { sequelize } = require("../db");

const { encodeWithoutDate } = require("../lib/encryption");

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

User.create({ username: "aaa", password: encodeWithoutDate("aaa") });
User.create({ username: "bbb", password: encodeWithoutDate("bbb") });
