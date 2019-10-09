const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const User = require("../model/user");
const app = require("./index");

chai.use(chaiHttp);

describe("User API test", async () => {
	// const server = app.listen(56556);
	it("test getUser roles:", async () => {
		expect(true).to.be.true;
		const u = await User.findOne({
			where: {
				username: "aaa"
			}
		});
		expect(u).not.to.be.null;
		const roles = await u.getRoles();
		expect(roles).not.to.be.empty;
	});
	// it("get all users", async () => {
	// 	const req = chai.request.agent(server);
	// 	let res = await req
	// 		.post("/adminlogin")
	// 		.type("form")
	// 		.send({
	// 			username: "superadmin",
	// 			password: "superadmin"
	// 		});
	// 	// let res = await req.get("/adminlogin");
	// 	expect(res).to.have.cookie("koa:sess");
	// 	res = await req.get("/api/user/");
	// 	expect(res).to.have.status(200);
	// 	expect(res).to.be.json;
	// 	req.close();
	// });
	// it("test anonymous access right", async () => {
	// 	const req = chai.request.agent(server);
	// 	const res = await req.get("/api/policy/");
	// 	expect(res).to.have.status(403);
	// 	req.close();
	// });
});
