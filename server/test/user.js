const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("./index");

chai.use(chaiHttp);

describe("User API test", () => {
	const server = app.listen(56556);

	it("get all users", async () => {
		const req = chai.request.agent(server);
		let res = await req.get("/adminlogin");
		// // expect(res).to.be.text;
		expect(res).to.have.cookie("koa:sess");
		res = await req.get("/api/user/");
		// expect(res).to.be.json;
		// res = await req.get('/logout');
		// expect(res).to.be.text;
		// const res = await req.get("/adminlogin");
		expect(res).to.have.status(200);
		expect(res).to.be.json;
		// let agent = chai.request.agent(server);
		// agent
		// 	.get("/adminlogin")
		// 	.then(function(res) {
		// 		expect(res).to.have.cookie("koa:sess");
		// 		// The `agent` now has the sessionid cookie saved, and will send it
		// 		// back to the server in the next request:
		// 		return agent.get("/api/user/").then(function(res) {
		// 			expect(res).to.have.status(200);
		// 		});
		// 	});
	});
	it("test anonymous access right", async () => {
		const res = await chai.request(server).get("/dataset1/aaa");
		expect(res).to.have.status(403);
	});
});
