const path = require('path');
const casbin = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const BaseAuthenticator = require('./BaseAuthenticator');
const BasicAuthenticator = require('./BasicAuthenticator');
import authorize from './authorization';
const authentic = require('./authentication');
import getEnforcer from '../lib/enforcer';

const auth = authenticator => {
    const authen = authenticator ? authenticator : new BasicAuthenticator();

    if (!(authen instanceof BaseAuthenticator)) {
        throw Error('authenticator must be extends from BaseAuthenticator');
    }

    return async function(context, next): Promise<void> {
        const url = context.request.url;
        if (
            url.startsWith('/_nuxt') ||
            url.startsWith('/__webpack_hmr') ||
            url.startsWith('/vuetify.css.map')
        ) {
            await next();
            return;
        }
        await authentic(context, authen);

        // const adpt = await SequelizeAdapter.newAdapter({
        //     host: 'localhost',
        //     dialect: 'sqlite',
        //     storage: path.join(__dirname, '../test/database/nuxtauth.sqlite'),
        //     logging: false
        // });

        // const enforcer = await casbin.newEnforcer(
        //     path.join(__dirname, 'casbin/model.conf'),
        //     adpt
        // );

        const enforcer = await getEnforcer();

        const allowed = await authorize(context, enforcer);
        console.log(
            context.state.currentUser.username +
                ' request url is: ' +
                context.request.url +
                ', request action is: ' +
                context.method +
                ', permission is: ' +
                allowed +
                ', at ' +
                Date()
        );
        if (!allowed) {
            context.respond = true;
            context.response.status = 403;
            context.response.body = 'forbidden, bye';
            // context.throw(403)
        } else {
            await next();
        }
    };
};

export default auth;
