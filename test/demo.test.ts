describe("Test Cypher Service", () => {
  const cypher = require("../src/services/CypherService");

  test("Test 1: Exported methods need to be defined", (done) => {
    expect(cypher).toBeDefined();
    expect(cypher.cypherData).toBeDefined();
    expect(cypher.decypherData).toBeDefined();
    expect(cypher.getCypherDataInitVector).toBeDefined();
    expect(cypher.getCypherData).toBeDefined();
    done();
  });
});
