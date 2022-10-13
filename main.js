import { cases } from "./cases.js";

const RIGHT = ">";
const LEFT = "<";
const UP = "^";
const DOWN = "v";
const X = "X";
const ASS = "A";
const EMPTY = ".";

function solution(B) {
  const input = B.map((row) => row.split(""));
  console.log(input);
  const inputLength = input[0].length;
  const inputHeight = input.length;
  let initX = null;
  let initY = null;
  for (let y = 0; y < inputHeight; y++) {
    for (let x = 0; x < inputLength; x++) {
      if (input[y][x] === ASS) {
        initY = y;
        initX = x;
      }
    }
  }

  const isOnSightLine = (x, y, direction) => {
    let currentX = x;
    let currentY = y;
    switch (direction) {
      case UP: {
        while (currentY >= 0) {
          if (input[currentY][currentX] === DOWN) {
            return true;
          } else if ([LEFT, UP, RIGHT, X].includes(input[currentY][currentX])) {
            return false;
          }
          currentY -= 1;
        }
        break;
      }
      case DOWN: {
        while (currentY < inputHeight) {
          if (input[currentY][currentX] === UP) {
            return true;
          } else if (
            [LEFT, RIGHT, DOWN, X].includes(input[currentY][currentX])
          ) {
            return false;
          }
          currentY += 1;
        }
        break;
      }
      case LEFT: {
        while (currentX >= 0) {
          if (input[currentY][currentX] === RIGHT) {
            return true;
          } else if ([LEFT, UP, DOWN, X].includes(input[currentY][currentX])) {
            return false;
          }
          currentX -= 1;
        }
        break;
      }
      case RIGHT: {
        while (currentX < inputLength) {
          if (input[currentY][currentX] === LEFT) {
            return true;
          } else if ([RIGHT, UP, DOWN, X].includes(input[currentY][currentX])) {
            return false;
          }
          currentX += 1;
        }
      }
    }
    return false;
  };

  if (
    isOnSightLine(initX, initY, UP) ||
    isOnSightLine(initX, initY, DOWN) ||
    isOnSightLine(initX, initY, LEFT) ||
    isOnSightLine(initX, initY, RIGHT)
  ) {
    return false;
  }

  let currentPositions = [[initX, initY]];
  let pastPositions = [[initX, initY]];
  const hasBeenVisited = (x, y) =>
    typeof pastPositions.find((pos) => pos[0] === x && pos[1] === y) !=
    "undefined";
  const isGoal = (x, y) => x === inputLength - 1 && y === inputHeight - 1;

  while (currentPositions.length > 0) {
    const [currentX, currentY] = currentPositions[0];
    currentPositions = currentPositions.slice(1);

    if (
      currentY + 1 < inputHeight &&
      !hasBeenVisited(currentX, currentY + 1) &&
      input[currentY + 1][currentX] === EMPTY
    ) {
      if (
        !isOnSightLine(currentX, currentY + 1, LEFT) &&
        !isOnSightLine(currentX, currentY + 1, RIGHT)
      ) {
        if (isGoal(currentX, currentY + 1)) {
          return true;
        }
        currentPositions.push([currentX, currentY + 1]);
        pastPositions.push([currentX, currentY + 1]);
      }
    }
    if (
      currentY - 1 >= 0 &&
      !hasBeenVisited(currentX, currentY - 1) &&
      input[currentY - 1][currentX] === EMPTY
    ) {
      if (
        !isOnSightLine(currentX, currentY - 1, LEFT) &&
        !isOnSightLine(currentX, currentY - 1, RIGHT)
      ) {
        if (isGoal(currentX, currentY - 1)) {
          return true;
        }
        currentPositions.push([currentX, currentY - 1]);
        pastPositions.push([currentX, currentY - 1]);
      }
    }
    if (
      currentX + 1 < inputLength &&
      !hasBeenVisited(currentX + 1, currentY) &&
      input[currentY][currentX + 1] === EMPTY
    ) {
      if (
        !isOnSightLine(currentX + 1, currentY, UP) &&
        !isOnSightLine(currentX + 1, currentY, DOWN)
      ) {
        if (isGoal(currentX + 1, currentY)) {
          return true;
        }
        currentPositions.push([currentX + 1, currentY]);
        pastPositions.push([currentX + 1, currentY]);
      }
    }
    if (
      currentX - 1 >= 0 &&
      !hasBeenVisited(currentX - 1, currentY) &&
      input[currentY][currentX - 1] === EMPTY
    ) {
      if (
        !isOnSightLine(currentX - 1, currentY, UP) &&
        !isOnSightLine(currentX - 1, currentY, DOWN)
      ) {
        if (isGoal(currentX - 1, currentY)) {
          return true;
        }
        currentPositions.push([currentX - 1, currentY]);
        pastPositions.push([currentX - 1, currentY]);
      }
    }
  }
  return false;
}

cases.forEach((input) => {
  console.log(solution(input));
});
