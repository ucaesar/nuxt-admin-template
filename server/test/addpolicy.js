const path = require("path");
const casbin = require("casbin");
const { SequelizeAdapter } = require("casbin-sequelize-adapter");
// const policyArr = [
// 	["p", "dataset1_admin", "/dataset1/*", "*"],
// 	["p", "dataset1_admin", "/dataset2/*", "*"],
// 	["p", "dataset1_admin", "/", "*"],
// 	["p", "dataset1_admin", "/login", "*"],
// 	["p", "dataset1_admin", "/logout", "*"],
// 	["p", "anonymous", "/", "GET"],
// 	["p", "anonymous", "/", "POST"],
// 	["p", "anonymous", "/login", "GET"],
// 	["g", "cathy", "dataset1_admin"],
// 	["g", "aaa", "dataset1_admin"],
// 	["g", "anonymous", "anonymous"]
// ];

const policyArr = [
	["dataset1_admin", "/dataset1/*", "*"],
	["dataset1_admin", "/dataset2/*", "*"],
	["dataset1_admin", "/", "*"],
	["dataset1_admin", "/login", "*"],
	["dataset1_admin", "/logout", "*"],
	["anonymous", "/", "GET"],
	["anonymous", "/", "POST"],
	["anonymous", "/login", "GET"]
	// ["g", "cathy", "dataset1_admin"],
	// ["g", "aaa", "dataset1_admin"],
	// ["g", "anonymous", "anonymous"]
];

async function addPolicy() {
	const a = await SequelizeAdapter.newAdapter({
		host: "localhost",
		dialect: "sqlite",
		storage: path.join(__dirname, "./database/policy.sqlite")
	});
	const e = await casbin.newEnforcer(
		path.join(__dirname, "../middlewares/casbin/model.conf"),
		// path.join(__dirname, "../middlewares/casbin/policy.csv")
		a
	);

	for (let index in policyArr) {
		if (!(await e.hasPolicy(...policyArr[index]))) {
			await e.addPolicy(...policyArr[index]);
		}
    }
	e.addRoleForUser("cathy", "dataset1_admin");
	e.addRoleForUser("aaa", "dataset1_admin");
    e.addRoleForUser("anonymous", "anonymous");
}

async function testPolicy() {
	const a = await SequelizeAdapter.newAdapter({
		host: "localhost",
		dialect: "sqlite",
		storage: path.join(__dirname, "./database/policy.sqlite")
	});
	const e1 = await casbin.newEnforcer(
		path.join(__dirname, "../middlewares/casbin/model.conf"),
		path.join(__dirname, "../middlewares/casbin/policy.csv")
		// a
	);
	const e2 = await casbin.newEnforcer(
		path.join(__dirname, "../middlewares/casbin/model.conf"),
		// path.join(__dirname, "../middlewares/casbin/policy.csv")
		a
	);
	console.log(e1.getPolicy());
	console.log(e1.getAllRoles());
	console.log("------------------------------");
	console.log(e2.getPolicy());
    console.log(e2.getAllRoles());
    const roles = await e2.getRolesForUser('aaa')
    console.log(roles);
    console.log(e2.getPermissionsForUser(roles[0]));
	console.log(await e1.enforce("aaa", "/", "GET"));
}

addPolicy();
// testPolicy();
