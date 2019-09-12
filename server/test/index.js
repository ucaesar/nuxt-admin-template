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

const str = "1ef85f70-d2dd-11e9-bee8-63ec730cb846";

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
		console.log("mysql connected");
	})
	.catch(err => {
		console.error("mysql connect failed" + err);
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

router.get("/aaa", async (ctx, next) => {
	ctx.session.username = "aaa";
	ctx.state.currentUser = { username: "aaa" };
	next();
});

app.use(async (ctx, next) => {
	await next();
	const { username } = ctx.state.currentUser;
	ctx.response.type = "text/html";
	ctx.response.body = "<h1>hello " + username + " auth</h1>";
});

app.use(router.routes());

app.listen(56556);
