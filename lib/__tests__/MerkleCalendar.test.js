"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MerkleCalendar_1 = require("../MerkleCalendar");
describe("MerkleCalendar", function () {
    var mc = new MerkleCalendar_1.MerkleCalendar();
    test("defines setRule()", function () {
        expect(typeof mc.addRegistration).toBe("function");
    });
});
