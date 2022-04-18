import { ICypherConfigInput } from "../interfaces/ICypherConfig";
import {
  cypherDataByConfig,
  decypherDataByConfig,
  getCypherDataByConfig,
  getCypherDataConfig,
  getCypherDataInitVectorByConfig,
} from "./CypherFunctions";
export class CypherService {
  private readonly cypherKey: string;
  private readonly configObj: ICypherConfigInput;
  /**
   *
   */
  constructor(cypherKey: string, configObj?: ICypherConfigInput | null) {
    this.cypherKey = cypherKey;
    this.configObj = getCypherDataConfig(configObj);
  }

  cypherData(data: any) {
    return cypherDataByConfig(data, this.cypherKey, this.configObj);
  }

  decypherData(cypherdata: string) {
    return decypherDataByConfig(cypherdata, this.cypherKey, this.configObj);
  }

  getCypherData(cypherdata: string) {
    return getCypherDataByConfig(cypherdata, this.configObj);
  }

  getCypherDataInitVector(cypherdata: string) {
    return getCypherDataInitVectorByConfig(cypherdata, this.configObj);
  }
}
