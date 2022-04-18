describe("Test Cypher Service", () => {
  const cypher = require("../src/services/CypherFunctions");
  const { CypherService } = require("../src/services/CypherService");
  const service = new CypherService("dfv4c78k93245xdopt2sdhjt3a8b9wmu");
  const toCypher = {
    propertyA: "Valor propiedad A",
    propertyB: "Valor propiedad B",
    propertyC: 40,
    propertyD: new Date().toISOString(),
  };

  test("Test 1: Exported methods need to be defined", (done) => {
    expect(cypher).toBeDefined();
    expect(cypher.cypherData).toBeDefined();
    expect(cypher.decypherData).toBeDefined();
    expect(cypher.getCypherDataInitVector).toBeDefined();
    expect(cypher.getCypherData).toBeDefined();
    done();
  });

  test("Test 2: Test CypherService class", (done) => {
    expect(service).toBeDefined();
    expect(service.cypherData).toBeDefined();
    const cypherData = service.cypherData(toCypher);
    expect(cypherData).toBeDefined();
    const data = service.decypherData(cypherData);
    expect(data).toBeDefined();
    expect(data.propertyA).toBeDefined();
    expect(data.propertyA).toEqual(toCypher.propertyA);
    expect(data.propertyB).toBeDefined();
    expect(data.propertyB).toEqual(toCypher.propertyB);
    expect(data.propertyC).toBeDefined();
    expect(data.propertyC).toEqual(toCypher.propertyC);
    expect(data.propertyD).toBeDefined();
    expect(data.propertyD).toEqual(toCypher.propertyD);
    done();
  });
});
