function compareArrays(array1: string[], array2: string[]):boolean;
function compareArrays(array1: number[], array2: number[]):boolean;
function compareArrays(array1: string[]|number[], array2: string[]|number[]):boolean {
  const array2Sorted = array2.slice().sort();
  return array1.length === array2.length && array1.slice().sort().every(function(value, index) {
      return value === array2Sorted[index];
  });
}

export default compareArrays;