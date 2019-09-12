module.exports = async function(context, enforcer) {
	const { username: sub } = context.state.currentUser;
	const { originalUrl: obj, method: act } = context;
	const allowed = await enforcer.enforce(sub, obj, act);
	return allowed;
};
