import {readFileAsync} from '../helpers';

const checkIsGameValid = (
  setCounter: Record<string, number>,
  totalCubes: {red: number; green: number; blue: number},
) => {
  const {red, green, blue} = setCounter;
  const {red: totalRed, green: totalGreen, blue: totalBlue} = totalCubes;

  return red <= totalRed && green <= totalGreen && blue <= totalBlue;
};

const part1 = async () => {
  //12 red cubes, 13 green cubes, and 14 blue cubes
  const cubes = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const arr = await readFileAsync('../day2/input.txt');
  if (!arr) {
    return null;
  }

  const totalCubes = {
    green: 13,
    blue: 14,
    red: 12,
  };

  const res = arr.reduce((acc, curr) => {
    const sets = curr
      .replace(/Game \d+: /, '')
      .trim()
      .split(';');
    const gameValid = sets
      .map((set: string) => {
        const setCounter: Record<string, number> = {
          red: 0,
          green: 0,
          blue: 0,
        };

        const gameSet = set.split(',').map((x: string) => x.trim());
        gameSet.map(gS => {
          const [number, colour] = gS.split(' ');
          setCounter[colour] += Number(number);
        });
        return checkIsGameValid(setCounter, totalCubes);
      })
      .every(x => x);
    const gameId = Number(curr.split(':')[0].replace('Game ', ''));
    if (gameValid) {
      return acc + gameId;
    }
    return acc;
  }, 0);

  console.log('File processed.', 'Sum of numbers:', res);
};

const part2 = async () => {
  const arr = await readFileAsync('../day2/input.txt');
  if (!arr) {
    return null;
  }

  const res = arr.reduce((acc, curr) => {
    const sets = curr
      .replace(/Game \d+: /, '')
      .trim()
      .split(';');
    const minCubesCounter: Record<string, number> = {
      red: 0,
      green: 0,
      blue: 0,
    };

    sets.map((set: string) => {
      const gameSet = set.split(',').map((x: string) => x.trim());
      gameSet.map(gS => {
        const [number, colour] = gS.split(' ');
        if (minCubesCounter[colour] < Number(number)) {
          minCubesCounter[colour] = Number(number);
        }
      });
    });
    const multyNumber = Object.values(minCubesCounter).reduce(
      (acc, curr) => acc * curr,
      1,
    );
    return acc + multyNumber;
  }, 0);
  console.log('File processed.', 'Result:', res);
};

// part1();
part2();
