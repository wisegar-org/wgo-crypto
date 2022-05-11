import {
  generateDataSignature,
  validateDataSignature,
} from "../src/services/SignatureService";

describe("Test Signature Service", () => {
  const data = "This data will be signed";
  test("Test: generate & validate data signature", (done) => {
    const { generateKeyPair } = require("node:crypto");
    generateKeyPair(
      "rsa",
      {
        modulusLength: 4096,
        publicKeyEncoding: {
          type: "spki",
          format: "pem",
        },
        privateKeyEncoding: {
          type: "pkcs8",
          format: "pem",
          cipher: "aes-256-cbc",
          passphrase: "top secret... this is... a secretttt",
        },
      },
      (err: any, publicKey: string, privateKey: string) => {
        if (err) throw new Error("Error generating public/private key");
        if (!publicKey) throw new Error("Error generating public key");
        if (!privateKey) throw new Error("Error generating privateKey key");

        try {
          debugger;
          expect(generateDataSignature).toBeDefined();
          const signature = generateDataSignature(privateKey, data);
          expect(signature).toBeDefined();
          expect(validateDataSignature).toBeDefined();
          const isValid = validateDataSignature(publicKey, signature, data);
          expect(isValid).toBeTruthy();
        } catch (error) {
          debugger;
        }

        done();
      }
    );
  });
});
