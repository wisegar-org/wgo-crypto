import { GetCypherKey } from "@wisegar-org/wgo-settings";
import { createCipheriv, createDecipheriv, randomBytes } from "crypto";
import {
  ICypherConfig,
  ICypherConfiInput as ICypherConfigInput,
} from "../interfaces/ICypherConfig";

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
export const cypherData = (
  data: any,
  configObj: ICypherConfigInput | undefined = defaultCyperConfig
): string => {
  const config = getCypherDataConfig(configObj);
  const cypherKey = GetCypherKey();
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
export const decypherData = (
  cypherdata: string,
  configObj: ICypherConfigInput | undefined = defaultCyperConfig
): string => {
  const config = getCypherDataConfig(configObj);
  const cypherKey = GetCypherKey();
  const keyBuffer = Buffer.from(cypherKey, config.bufferEncoding);
  const initVectorToken = getCypherDataInitVector(cypherdata, config);
  const initVector = Buffer.from(initVectorToken, config.outputEncoding);
  const cypgherContent = getCypherData(cypherdata, config);
  const decipher = createDecipheriv(config.algorithm, keyBuffer, initVector);
  const deciphered = decipher.update(
    cypgherContent,
    config.outputEncoding,
    config.inputEncoding
  );
  const decipheredFinal = deciphered + decipher.final(config.inputEncoding);
  return JSON.parse(decipheredFinal);
};

export const getCypherDataInitVector = (
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

  return splittedCypherData[0];
};

export const getCypherData = (
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

const getCypherDataConfig = (configObj?: ICypherConfigInput): ICypherConfig => {
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
