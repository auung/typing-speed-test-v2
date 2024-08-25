import { Letter } from "../types/Letter";

function parseData(data: string): Letter[] {
  const array = [];
  const temp = data.split("");
  for (let i = 0; i <= temp.length; i++) {
    const id = i;
    const letter = temp[i];
    const status = i === 0 ? "current" : "";

    array.push({id, letter, status});
  }
  return array;
}

export default parseData;