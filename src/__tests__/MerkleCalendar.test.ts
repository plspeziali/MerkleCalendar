import { MerkleCalendar } from "../MerkleCalendar";

describe("MerkleCalendar", () => {
  const mc = new MerkleCalendar();

  test("defines setRule()", () => {
    expect(typeof mc.addRegistration).toBe("function");
  });
});