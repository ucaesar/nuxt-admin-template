const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("./index");

chai.use(chaiHttp);

describe("Role API test", () => {
	const server = app.listen(56556);

	it("get all roles", async () => {
        const req = chai.request.agent(server);
        let res = null;
		res = await req
			.post("/adminlogin")
			.type("form")
			.send({
				username: "superadmin",
				password: "superadmin"
			});
		// expect(res).to.have.cookie("koa:sess");
		res = await req.get("/api/role/");
		expect(res).to.have.status(200);
		expect(res).to.be.json;
		req.close();
	});
});
