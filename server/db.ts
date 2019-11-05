import path from 'path';
import { Sequelize } from 'sequelize-typescript';

// const sequelize = new Sequelize("koaauthtest", "root", "qwert12345", {
// 	host: "localhost",
// 	dialect: "mysql"
// });

async function connectdb(sq: Sequelize): Promise<void> {
    // sq.authenticate()
    //     .then(() => {
    //         console.log('database connected')
    //     })
    //     .catch(err => {
    //         console.error('database connect failed' + err)
    //     })
    // await sq.authenticate()

    // sq.sync()
    //     .then(() => {
    //         console.log('init db ok')
    //     })
    //     .catch(err => {
    //         console.log('init db error', err)
    //     })
    await sq.sync({ alter: true });
}

const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, './test/database/nuxtauth.sqlite'),
    logging: (sql: string) => void {},
    models: [path.join(__dirname, './model')]
});
export { sequelize, connectdb };
