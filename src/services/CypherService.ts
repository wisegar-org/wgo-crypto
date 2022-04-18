import { ICypherConfigInput } from "../interfaces/ICypherConfig";
import {
  cypherDataByConfig,
  decypherDataByConfig,
  getCypherDataConfig,
} from "./CypherFunctions";

/**
 * CypherService class
 */
export class CypherService {
  private readonly cypherKey: string;
  private readonly configObj: ICypherConfigInput;
  /**
   * Cypher Service constructor.
   * @param cypherKey Need to be a string to cypher data.
   * @param configObj ICypherConfigInput with the config. This param is optional.
   */
  constructor(cypherKey: string, configObj?: ICypherConfigInput | null) {
    this.cypherKey = cypherKey;
    this.configObj = getCypherDataConfig(configObj);
  }

  /**
   * Data cypher
   * @param data Can be any base object ex. {userid: 1, expiration: '2234556', sessionid: 'nwljkcnlndclwnwle'}
   * @returns string
   */
  cypherData(data: any): string {
    return cypherDataByConfig(data, this.cypherKey, this.configObj);
  }

  /**
   * Data decypher
   * @param cypherdata Most a already cyphered data
   * @returns json data object
   */
  decypherData(cypherdata: string): any {
    return decypherDataByConfig(cypherdata, this.cypherKey, this.configObj);
  }
}
