const BaseAuthenticator = require("./middlewares/BaseAuthenticator");

class SessionAthenticator extends BaseAuthenticator {
	// constructor() {
	// 	super();
	// }
	getUser(context) {
		const sessionName = context.session.username;

		if (!sessionName) {
			context.state.currentUser = { username: "anonymous" };
		} else {
			context.state.currentUser = { username: "aaa" };
		}
	}

	login() {}

	logout() {}
}

module.exports = SessionAthenticator;
