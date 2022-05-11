import { createSign, createVerify } from "crypto";
/**
 * Acceptable values: results of crypto.getHashes()
 */
const ALGORITHM = "sha384";
/**
 * Acceptable values: hex, latin1, base64
 */
const SIGNATURE_FORMAT = "hex";
/**
 * Generates a signature for this provided data
 * @param privateKey Generated private key of pair <private/public key>
 * @param data Data to be signed
 * @returns Signature generated for this specific data
 */
export const generateDataSignature = (privateKey: string, data: any) => {
  const sign = createSign(ALGORITHM);
  sign.update(data);
  const signature = sign.sign(privateKey, SIGNATURE_FORMAT);
  return signature;
};
/**
 * Verify the signed data authenticity
 * @param publicKey Generated public key of pair <private/public key>
 * @param signature  Signature generated for this specific data
 * @param data Signed Data
 * @returns
 */
export const validateDataSignature = (
  publicKey: string,
  signature: string,
  data: any
) => {
  const verify = createVerify(ALGORITHM);
  verify.update(data);
  const verification = verify.verify(publicKey, signature, SIGNATURE_FORMAT);
  return verification;
};
