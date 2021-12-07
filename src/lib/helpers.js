import db from "./db";
import { JSONPath } from "jsonpath-plus";
export const findById = (id) => {
  return JSONPath(`$.playerData.[?(@.id=="${id}")]`, db);
};
export const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(
      currentValue
    );
    return result;
  }, {});
};
export const summarizeColor = (color, object) => {
  let resultObj = {
    color: color,
    result: [],
    firstServPerc: 0,
    fhWinPerc: 0,
    bhWinPerc: 0,
    netFrequency: 0,
    returnInPlay: 0,
  };
  let stats = object[color];
  let arrLength = stats.length;
  for (let i = 0; i < arrLength; i++) {
    resultObj.color = color;
    resultObj.result.push(stats[i].result);
    resultObj.firstServPerc += parseInt(stats[i].firstServPerc);
    resultObj.fhWinPerc += parseInt(stats[i].fhWinPerc);
    resultObj.bhWinPerc += parseInt(stats[i].bhWinPerc);
    resultObj.netFrequency += parseInt(stats[i].netFrequency);
    resultObj.returnInPlay += parseInt(stats[i].returnInPlay);
  }
  resultObj.result = resultObj.result.filter(x => x === "win").length * 100 / arrLength;
  resultObj.firstServPerc /= arrLength;
  resultObj.fhWinPerc /= arrLength;
  resultObj.bhWinPerc /= arrLength;
  resultObj.netFrequency /= arrLength;
  resultObj.returnInPlay /= arrLength;
  return resultObj;
};
export const roundToTwo = (num) => {
  return +(Math.round(num + "e+2")  + "e-2");
}