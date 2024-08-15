import { Letter } from "../types/Letter";

function parseData(data: string): Letter[] {
  const array = [];
  const temp = data.split("");
  for (let i = 0; i <= temp.length; i++) {
    const id = i;
    const letter = temp[i];
    const isCurrent = i === 0;
    const isCorrect = false;

    array.push({id, letter, isCurrent, isCorrect});
  }
  return array;
}

export default parseData;