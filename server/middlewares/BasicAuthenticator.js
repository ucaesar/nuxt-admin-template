const BaseAuthenticator = require('./BaseAuthenticator');

class BasicAuthenticator extends BaseAuthenticator {
    // constructor() {
    // 	super();
    // }

    getUser(context) {
        const sessionKey = context.get('x-session');

        const sessionName = context.session.username;

        if (!sessionKey && !sessionName) {
            // context.throw(401, "x-session missed");
            context.state.currentUser = { username: 'anonymous' };
        } else {
            context.state.currentUser = { username: 'aaa' };
        }
    }

    login() {}

    logout() {}
}

module.exports = BasicAuthenticator;
