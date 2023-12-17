import { readFileAsync } from "../helpers";

const processLineByLinePartOne = async () => {
  const arr = await readFileAsync("../day1/input.txt");
  if (!arr) {
    return null;
  }

  const sum = arr.reduce((acc, curr) => {
    if (curr) {
      const chars = curr.split("");
      const firstNum = chars.find((x: string) => x.match(/[0-9]/));
      const lastNum = chars.findLast((x: string) => x.match(/[0-9]/));
      const targetNum = Number(firstNum) * 10 + Number(lastNum);
      return acc + targetNum;
    }
    return acc;
  }, 0);

  console.log("File processed.", "Sum of numbers:", sum);
};

const numberMap: Record<string, number> = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

const processLineByLinePartTwo = async () => {
  const arr = await readFileAsync("../day1/input.txt");
  if (!arr) {
    return null;
  }

  const sum = arr.reduce((acc, curr) => {
    const numberCharsFromLine: {
      number: number;

      occurrence: number;
    }[] = [];

    for (const x of Object.keys(numberMap)) {
      let index = curr.indexOf(x);
      while (index !== -1) {
        numberCharsFromLine.push({ number: numberMap[x], occurrence: index });
        index = curr.indexOf(x, index + 1);
      }
    }

    const sortedNumberCharsFromLine = numberCharsFromLine.sort(
      (a, b) => a?.occurrence - b?.occurrence,
    );
    if (sortedNumberCharsFromLine.length > 0) {
      return (
        acc +
        sortedNumberCharsFromLine?.[0].number * 10 +
        sortedNumberCharsFromLine[sortedNumberCharsFromLine?.length - 1]?.number
      );
    }

    return acc;
  }, 0);

  console.log("File processed.", "Sum of numbers:", sum);
};

processLineByLinePartOne();
processLineByLinePartTwo();
