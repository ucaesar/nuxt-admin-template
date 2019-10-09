const Sequelize = require("sequelize");
const { sequelize } = require("../db");
const getEnforcer = require("../lib/enforcer");

const User = sequelize.define("userabc", {
	id: {
		type: Sequelize.UUID,
		unique: true,
		primaryKey: true,
		allowNull: false,
		defaultValue: Sequelize.UUIDV1
	},
	username: {
		type: Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		unique: false,
		allowNull: false
	}
});

User.prototype.getRoles = async function() {
	const e = await getEnforcer();
	console.log("get user roles by id: " + this.id);
	const result = await e.getRolesForUser(this.username);
	return result;
};

module.exports = User;
