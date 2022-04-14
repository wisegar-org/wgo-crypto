import { Encoding } from "crypto";

export interface ICypherConfig {
  algorithm: string;
  bufferEncoding: BufferEncoding;
  randomBytesSize: number;
  outputEncoding: Encoding;
  inputEncoding: Encoding;
  initVetorDataSeparator: string;
}

export interface ICypherConfiInput {
  algorithm?: string;
  bufferEncoding?: BufferEncoding;
  randomBytesSize?: number;
  outputEncoding?: Encoding;
  inputEncoding?: Encoding;
  initVetorDataSeparator?: string;
}
