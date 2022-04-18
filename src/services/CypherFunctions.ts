import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import { ICypherConfig, ICypherConfigInput } from "../interfaces/ICypherConfig";

const defaultCyperConfig: ICypherConfig = {
  algorithm: "aes256",
  bufferEncoding: "latin1",
  randomBytesSize: 16,
  outputEncoding: "hex",
  inputEncoding: "utf8",
  initVetorDataSeparator: ":",
};

/**
 * Data cypher
 * @param data Can be any base object ex. {userid: 1, expiration: '2234556', sessionid: 'nwljkcnlndclwnwle'}
 * @returns string
 */
export const cypherData = (data: any, cypherKey: string): string => {
  return cypherDataByConfig(data, cypherKey);
};

/**
 * Data cypher
 * @param data Can be any base object ex. {userid: 1, expiration: '2234556', sessionid: 'nwljkcnlndclwnwle'}
 * @param configObj Can be an ICypherConfigInput
 * @returns string
 */
export const cypherDataByConfig = (
  data: any,
  cypherKey: string,
  configObj: ICypherConfigInput = defaultCyperConfig
): string => {
  const config = getCypherDataConfig(configObj);
  const keyBuffer = Buffer.from(cypherKey, config.bufferEncoding);
  const initVector = randomBytes(config.randomBytesSize);
  const encrypt = createCipheriv(config.algorithm, keyBuffer, initVector);
  const encrypted = encrypt.update(
    JSON.stringify(data),
    config.inputEncoding,
    config.outputEncoding
  );
  const encryptedFinal = encrypted + encrypt.final(config.outputEncoding);
  return initVector.toString(config.outputEncoding) + ":" + encryptedFinal;
};

/**
 * Data decypher
 * @param cypherdata Most a already cyphered data
 * @returns json data object
 */
export const decypherData = (cypherdata: string, cypherKey: string): string => {
  return decypherDataByConfig(cypherdata, cypherKey);
};

/**
 * Data decypher
 * @param cypherdata Most a already cyphered data
 * @param configObj Can be an ICypherConfigInput
 * @returns json data object
 */
export const decypherDataByConfig = (
  cypherdata: string,
  cypherKey: string,
  configObj: ICypherConfigInput | undefined = defaultCyperConfig
): string => {
  const config = getCypherDataConfig(configObj);
  const keyBuffer = Buffer.from(cypherKey, config.bufferEncoding);
  const initVectorToken = getCypherDataInitVectorByConfig(cypherdata, config);
  const initVector = Buffer.from(initVectorToken, config.outputEncoding);
  const cypgherContent = getCypherDataByConfig(cypherdata, config);
  const decipher = createDecipheriv(config.algorithm, keyBuffer, initVector);
  const deciphered = decipher.update(
    cypgherContent,
    config.outputEncoding,
    config.inputEncoding
  );
  const decipheredFinal = deciphered + decipher.final(config.inputEncoding);
  return JSON.parse(decipheredFinal);
};

export const getCypherDataInitVector = (cypherdata: string) => {
  return getCypherDataInitVectorByConfig(cypherdata);
};

export const getCypherDataInitVectorByConfig = (
  cypherdata: string,
  configObj: ICypherConfigInput = defaultCyperConfig
) => {
  const config = getCypherDataConfig(configObj);
  if (!cypherdata)
    throw "GetCypherDataInitVector: invalid cypherdata parameter!";

  if (!cypherdata.includes(config.initVetorDataSeparator))
    throw "GetCypherDataInitVector: invalid cypherdata separator parameter!";

  const splittedCypherData = cypherdata.split(config.initVetorDataSeparator);
  if (!splittedCypherData || splittedCypherData.length < 1)
    throw "GetCypherDataInitVector: impossible to split the cypherdata!";

  return splittedCypherData[0];
};

export const getCypherData = (cypherdata: string) => {
  return getCypherDataByConfig(cypherdata);
};
export const getCypherDataByConfig = (
  cypherdata: string,
  configObj: ICypherConfigInput | undefined = defaultCyperConfig
) => {
  const config = getCypherDataConfig(configObj);
  if (!cypherdata)
    throw "GetCypherDataInitVector: invalid cypherdata parameter!";

  if (!cypherdata.includes(config.initVetorDataSeparator))
    throw "GetCypherDataInitVector: invalid cypherdata separator parameter!";

  const splittedCypherData = cypherdata.split(config.initVetorDataSeparator);
  if (!splittedCypherData || splittedCypherData.length < 1)
    throw "GetCypherDataInitVector: impossible to split the cypherdata!";

  return splittedCypherData[1];
};

export const getCypherDataConfig = (
  configObj?: ICypherConfigInput | null
): ICypherConfig => {
  if (!configObj) return defaultCyperConfig;

  return <ICypherConfig>{
    algorithm: configObj?.algorithm || defaultCyperConfig.algorithm,
    bufferEncoding:
      configObj?.bufferEncoding || defaultCyperConfig.bufferEncoding,
    initVetorDataSeparator:
      configObj?.initVetorDataSeparator ||
      defaultCyperConfig.initVetorDataSeparator,
    inputEncoding: configObj?.inputEncoding || defaultCyperConfig.inputEncoding,
    outputEncoding:
      configObj?.outputEncoding || defaultCyperConfig.outputEncoding,
    randomBytesSize:
      configObj?.randomBytesSize || defaultCyperConfig.randomBytesSize,
  };
};
