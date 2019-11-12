const path = require('path');
const casbin = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const policyArr = [
    ['p', 'dataset1_adminR', '/dataset1/*', '*'],
    ['p', 'dataset1_adminR', '/dataset2/*', '*'],
    ['p', 'dataset1_adminR', '/', '*'],
    ['p', 'dataset1_adminR', '/login', '*'],
    ['p', 'dataset1_adminR', '/logout', '*'],
    // ['p', 'anonymousR', '*', '*'],
    ['p', 'anonymousR', '/', 'GET'],
    ['p', 'anonymousR', '/', 'POST'],
    ['p', 'anonymousR', '/login', 'GET'],
    ['p', 'anonymousR', '/api/login', 'POST'],
    ['p', 'anonymousR', '/api/user/login', 'POST'],
    ['p', 'anonymousR', '/sw.js', 'GET'],
    ['p', 'superadminR', '/api/*', 'GET'],
    ['p', 'superadminR', '/api/user/superadmin/*', 'GET'],
    ['p', 'superadminR', '/api/user/superadmin', 'GET'],
    ['p', 'superadminR', '/api/logout', 'POST'],
    ['p', 'superadminR', '/api/user/logout', 'POST'],
    ['p', 'superadminR', '/api/roles/*', 'DELETE'],
    ['p', 'superadminR', '/api/roles/*', 'PUT'],
    ['p', 'superadminR', '/sw.js', 'GET'],
    ['g', 'cathy', 'dataset1_adminR'],
    ['g', 'aaa', 'dataset1_adminR'],
    ['g', 'anonymous', 'anonymousR'],
    ['g', 'superadminR', 'anonymousR'],
    ['g', 'superadmin', 'superadminR']
];

import getEnforer from '../lib/enforcer';

// async function testPolicy() {

// 	const e1 = await casbin.newEnforcer(
// 		path.join(__dirname, "../middlewares/casbin/model.conf"),
// 		path.join(__dirname, "../middlewares/casbin/policy.csv")
// 		// a
// 	);
// 	const e2 = await casbin.newEnforcer(
// 		path.join(__dirname, "../middlewares/casbin/model.conf"),
// 		// path.join(__dirname, "../middlewares/casbin/policy.csv")
// 		a
// 	);
// 	console.log(e1.getPolicy());
// 	console.log(e1.getAllRoles());
// 	console.log("------------------------------");
// 	console.log(e2.getPolicy());
// 	console.log(e2.getAllRoles());
// 	const roles = await e2.getRolesForUser("aaa");
// 	console.log(roles);
// 	console.log(e2.getPermissionsForUser(roles[0]));
// 	console.log(await e1.enforce("aaa", "/", "GET"));
// }

// addPolicy();
// testPolicy();

const assert = require('chai').assert;

describe('PolicyTest', () => {
    it('add policy', async () => {
        const e = await getEnforer();
        for (let index in policyArr) {
            const tp = policyArr[index].slice(0, 1)[0];
            const params = policyArr[index].slice(1);
            if (tp === 'p') {
                await e.addPolicy(...params);
            }
            if (tp === 'g') {
                await e.addGroupingPolicy(...params);
            }
        }
        for (let index in policyArr) {
            const tp = policyArr[index].slice(0, 1)[0];
            const params = policyArr[index].slice(1);
            if (tp === 'p') {
                assert.strictEqual(e.hasPolicy(...params), true);
            }
            if (tp === 'g') {
                assert.strictEqual(e.hasGroupingPolicy(...params), true);
            }
        }
    });
});
