const assert = require("assert");

console.log("client test1");
describe("client test1", () => {
	it("1等于1", () => {
		assert.strictEqual(1, 1);
	});
});
