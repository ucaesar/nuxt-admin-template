const chai = require("chai");
const expect = require("chai").expect;
const chaiHttp = require("chai-http");
const app = require("./index");

chai.use(chaiHttp);

describe("User API test", () => {
	const server = app.listen(56556);

	it("get all users array", async () => {
		const res = await chai.request(server).get("/api/user/");
		expect(res).to.be.json;
	});
	it("test anonymous access right", async () => {
		const res = await chai.request(server).get("/dataset1/aaa");
		expect(res).to.have.status(403);
	});
});
