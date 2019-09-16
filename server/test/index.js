"use strict";

console.log("hello auth");

const Koa = require("koa");

const serve = require("koa-static");

const session = require("koa-session");

const router = require("koa-router")();

const auth = require("../middlewares/auth");

const SessionAuthenticator = require("../SessionAuthenticator");

const { encode, decode } = require("../lib/encryption");

const { sequelize } = require("../db");

const app = new Koa();

const str = "2e592d50-d535-11e9-881c-31c34ad71a1b";

const encryptedStr = encode(str);

console.log(encryptedStr);
console.log(decode(encryptedStr));

app.keys = ["qwert12345"];

const CONFIG = {
	key: "koa:sess" /** (string) cookie key (default is koa:sess) */,
	/** (number || 'session') maxAge in ms (default is 1 days) */
	/** 'session' will result in a cookie that expires when session/browser is closed */
	/** Warning: If a session cookie is stolen, this cookie will never expire */
	maxAge: 60000,
	autoCommit: true /** (boolean) automatically commit headers (default true) */,
	overwrite: true /** (boolean) can overwrite or not (default true) */,
	httpOnly: true /** (boolean) httpOnly or not (default true) */,
	signed: true /** (boolean) signed or not (default true) */,
	rolling: false /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */,
	renew: false /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false) */
};

sequelize
	.authenticate()
	.then(() => {
		console.log("database connected");
	})
	.catch(err => {
		console.error("database connect failed" + err);
	});

sequelize
	.sync()
	.then(() => {
		console.log("init db ok");
	})
	.catch(err => {
		console.log("init db error", err);
	});

app.use(serve("."));

app.use(session(CONFIG, app));

const authenticator = new SessionAuthenticator();
app.use(auth(authenticator));

router.get("/login", async (ctx, next) => {
	// ctx.session.x_session = encode('2e592d50-d535-11e9-881c-31c34ad71a1b');
	// ctx.session.username = "aaa";
	// ctx.state.currentUser = { username: "aaa" };
	await authenticator.login(ctx);
	await next();
});

router.get("/logout", async (ctx, next) => {
	authenticator.logout(ctx);
	await next();
});

app.use(async (ctx, next) => {
	await next();
	const { username } = ctx.state.currentUser;
	ctx.response.type = "text/html";
	ctx.response.body = "<h1>hello " + username + " auth</h1>";
});

app.use(router.routes());

app.listen(56556);
