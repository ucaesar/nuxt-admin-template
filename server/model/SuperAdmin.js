const Sequelize = require("sequelize");
const { sequelize } = require("../db");

const SuperAdmin = sequelize.define("superadmin", {
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

module.exports = SuperAdmin;
