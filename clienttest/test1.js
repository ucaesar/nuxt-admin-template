const assert = require("chai").assert;

console.log("client test1");
describe("client test1", () => {
	it("1 = 1", () => {
		assert.strictEqual(1, 1);
	});
	it("2 = 2", () => {
		assert.strictEqual(1, 2);
	});
});
