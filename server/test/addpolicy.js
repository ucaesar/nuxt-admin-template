const path = require('path')
const casbin = require('casbin')
const { SequelizeAdapter } = require('casbin-sequelize-adapter')
const policyArr = [
    ['p', 'dataset1_admin', '/dataset1/*', '*'],
    ['p', 'dataset1_admin', '/dataset2/*', '*'],
    ['p', 'dataset1_admin', '/', '*'],
    ['p', 'dataset1_admin', '/login', '*'],
    ['p', 'dataset1_admin', '/logout', '*'],
    ['p', 'anonymous', '/', 'GET'],
    ['p', 'anonymous', '/', 'POST'],
    ['p', 'anonymous', '/login', 'GET'],
    ['p', 'anonymous', '/api/login', 'POST'],
    ['p', 'anonymous', '/adminlogin', 'GET'],
    ['p', 'anonymous', '/adminlogin', 'POST'],
    ['p', 'anonymous', '/superadmin', 'GET'],
    ['p', 'superadmin', '/api/*', 'GET'],
    ['p', 'superadmin', '/superadmin/*', 'GET'],
    ['p', 'superadmin', '/superadmin', 'GET'],
    ['g', 'cathy', 'dataset1_admin'],
    ['g', 'aaa', 'dataset1_admin'],
    ['g', 'anonymous', 'anonymous'],
    ['g', 'superadmin', 'superadmin']
]

async function getEnforer() {
    const a = await SequelizeAdapter.newAdapter({
        host: 'localhost',
        dialect: 'sqlite',
        storage: path.join(__dirname, './database/nuxtauth.sqlite'),
        logging: false
    })
    const e = await casbin.newEnforcer(
        path.join(__dirname, '../middlewares/casbin/model.conf'),
        // path.join(__dirname, "../middlewares/casbin/policy.csv")
        a
    )
    return e
}

// async function testPolicy() {
// 	const a = await SequelizeAdapter.newAdapter({
// 		host: "localhost",
// 		dialect: "sqlite",
// 		storage: path.join(__dirname, "./database/policy.sqlite")
// 	});
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

const assert = require('chai').assert

describe('PolicyTest', () => {
    it('add policy', async () => {
        const e = await getEnforer()
        for (let index in policyArr) {
            const tp = policyArr[index].slice(0, 1)[0]
            const params = policyArr[index].slice(1)
            if (tp === 'p') {
                await e.addPolicy(...params)
            }
            if (tp === 'g') {
                await e.addGroupingPolicy(...params)
            }
        }
        for (let index in policyArr) {
            const tp = policyArr[index].slice(0, 1)[0]
            const params = policyArr[index].slice(1)
            if (tp === 'p') {
                assert.strictEqual(e.hasPolicy(...params), true)
            }
            if (tp === 'g') {
                assert.strictEqual(e.hasGroupingPolicy(...params), true)
            }
        }
    })
})
