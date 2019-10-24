import path from 'path'
import casbin from 'casbin'
import {SequelizeAdapter} from 'casbin-sequelize-adapter'

async function getEnforer() {
    const a = await SequelizeAdapter.newAdapter({
        host: 'localhost',
        dialect: 'sqlite',
        storage: path.join(__dirname, '../test/database/nuxtauth.sqlite'),
        logging: false
    })
    const e = await casbin.newEnforcer(
        path.join(__dirname, '../middlewares/casbin/model.conf'),
        // path.join(__dirname, "../middlewares/casbin/policy.csv")
        a
    )
    return e
}

export default getEnforer
