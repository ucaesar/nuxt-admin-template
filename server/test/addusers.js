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

const arr = [
	"aaa",
	"bbb",
	"ccc",
	"ddd",
	"eee",
	"fff",
	"ggg",
	"hhh",
	"iii",
	"jjj",
	"kkk"
];

async function PrepareData() {
	for (let i = 0; i < arr.length; i++) {
		const u = await User.findOne({
			where: {
				username: arr[i]
			}
		});
		if (!u) {
			User.create({
				username: arr[i],
				password: encodeWithoutDate(arr[i])
			});
		}
	}
}
// PrepareData();
// User.create({ username: "aaa", password: encodeWithoutDate("aaa") });
// User.create({ username: "bbb", password: encodeWithoutDate("bbb") });
