import path from 'path'
import {Sequelize} from 'sequelize'

// const sequelize = new Sequelize("koaauthtest", "root", "qwert12345", {
// 	host: "localhost",
// 	dialect: "mysql"
// });

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, './test/database/nuxtauth.sqlite'),
    logging: false
})
export default sequelize
