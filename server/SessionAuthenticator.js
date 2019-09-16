const BaseAuthenticator = require("./middlewares/BaseAuthenticator");
const { encode, decode, encodeWithoutDate } = require("./lib/encryption");
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
					id: uid
				}
			});
			if (!u) {
				context.state.currentUser = { id: "-1", username: "anonymous" };
				return;
			}
			context.state.currentUser = { id: u.id, username: u.username };
		}
	}

	async login(context) {
		context.session.x_session = null;
		context.state.currentUser = { id: "-1", username: "anonymous" };
		// const username = context.getUsername;
		// const password = context.getPassword;
		const username = "aaa";
		const password = "aaa";
		const u = await User.findOne({
			where: {
				username,
				password: encodeWithoutDate(password)
			}
		});
		if (u) {
			context.session.x_session = encode(u.id);
			context.state.currentUser = { id: u.id, username: u.username };
		}
	}

	logout(context) {
		context.session.x_session = null;
		context.state.currentUser = { id: "-1", username: "anonymous" };
	}
}

module.exports = SessionAthenticator;
