const path = require("path");
const casbin = require("casbin");
const BaseAuthenticator = require("./BaseAuthenticator");
const BasicAuthenticator = require("./BasicAuthenticator");
const authorize = require("./authorization");
const authentic = require("./authentication");

module.exports = authenticator => {
	const authen = authenticator ? authenticator : new BasicAuthenticator();

	if (!(authen instanceof BaseAuthenticator)) {
		throw Error("authenticator must be extends from BaseAuthenticator");
	}

	return async function(context, next) {
		await authentic(context, authen);

		const enforcer = await casbin.newEnforcer(
			path.join(__dirname, 'casbin/model.conf'),
			path.join(__dirname, 'casbin/policy.csv')
		);

		const allowed = await authorize(context, enforcer);
		if (!allowed) {
			context.throw(403);
		}
		await next();
	};
};
