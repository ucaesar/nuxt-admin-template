const Sequelize = require('sequelize');
const { sequelize } = require('../db');
const getEnforcer = require('../lib/enforcer');

const SuperAdmin = sequelize.define('superadmin', {
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

// 下面两个方法与User相同代码重复，后期重构
SuperAdmin.prototype.getRoles = async function() {
	const e = await getEnforcer();
	console.log('get superadmin roles by id: ' + this.id);
	const result = await e.getRolesForUser(this.username);
	return result;
};

// 返回当前用户的所有可以访问的页面路径
SuperAdmin.prototype.getPagePaths = async function() {
	const e = await getEnforcer();
	// const roles = await e.getRolesForUser(this.username);
	// const result = await e.getPermissionsForUser(roles[0]);
	// 获取当前用户的授权数组
	const perms = await e.getPermissionsForUser(this.username);
	const result = [];
	for (const perm of perms) {
		// 动作为*和动作为GET的授权，才是页面访问的路径，其余可能是api路径
		if (perm[2] === 'GET' || perm[2] === '*') {
			result.push(perm[1]);
		}
	}
	return result;
};

module.exports = SuperAdmin;
