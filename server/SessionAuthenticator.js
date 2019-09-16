const BaseAuthenticator = require("./middlewares/BaseAuthenticator");
const { decode } = require("./lib/encryption");
const User = require("./model/user");

class SessionAthenticator extends BaseAuthenticator {
	// constructor() {
	// 	super();
	// }
	async getUser(context) {
		const sessionKey = context.session.x_session;

		if (!sessionKey) {
			context.state.currentUser = { id: "-1", username: "anonymous" };
		} else {
			const { id: uid, timespan } = decode(sessionKey);
			if (Date.now() - timespan > 1000 * 60 * 5) {
				context.state.currentUser = { id: "-1", username: "anonymous" };
				return;
			}
			const u = await User.findOne({
				where: {
					id: uid + "2"
				}
			});
			if (!u) {
				context.state.currentUser = { id: "-1", username: "anonymous" };
				return;
			}
			context.state.currentUser = { id: u.id, username: u.username };
		}
	}

	login() {}

	logout() {}
}

module.exports = SessionAthenticator;
