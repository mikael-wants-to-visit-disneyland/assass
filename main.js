import { cases } from "./cases.js"

const RIGHT = '>'
const LEFT = '<'
const UP = '^'
const DOWN = 'v'
const X = 'X'
const ASS = 'A'
const EMPTY = '.'

function solution(B) {
    const input = B.map((row) => row.split(''))
    console.log(input)
    const inputLength = input[0].length
    const inputHeight = input.length
    let initX = null
    let initY = null
    for (let y = 0; y < inputHeight; y++) {
        for (let x = 0; x < inputLength; x++) {
            if (input[y][x] === ASS) {
                initY = y;
                initX = x;
            }
        } 
    }

    let currentPositions = [[initX, initY]]
    let pastPositions = [[initX, initY]]
    const hasBeenVisited = (x, y) => typeof pastPositions.find((pos) => pos.x === x && pos.y === y) != 'undefined'

    const isOnSightLine = (x, y, direction) => {
        let currentX = x
        let currentY = y
        switch (direction) {
            case UP: {
                while (currentY >= 0) {
                    if (input[currentY][currentX] === DOWN) {
                        return true
                    } else if (input[currentY][currentX] === X) {
                        return false
                    }
                    currentY -= 1;
                }
            }
            case DOWN: {
                while (currentY < inputHeight) {
                    if (input[currentY][currentX] === UP) {
                        return true
                    } else if (input[currentY][currentX] === X) {
                        return false
                    }
                    currentY += 1;
                }
            }
            case LEFT: {
                while (currentY >= 0) {
                    if (input[currentY][currentX] === RIGHT) {
                        return true
                    } else if (input[currentY][currentX] === X) {
                        return false
                    }
                    currentX -= 1;
                }
            }
            case RIGHT: {
                while (currentY < inputLength) {
                    if (input[currentY][currentX] === LEFT) {
                        return true
                    } else if (input[currentY][currentX] === X) {
                        return false
                    }
                    currentX += 1;
                }
            }
        }
        return false
    }

    while (currentPositions.length > 0) {
               const [currentX, currentY] = currentPositions[0]
               currentPositions = currentPositions.slice(1)
               if (currentY + 1 < inputHeight && !hasBeenVisited(currentX, currentY) && input[currentY + 1][currentX] === EMPTY) {
                   if (!isOnSightLine(currentX, currentY + 1, LEFT) && !isOnSightLine(currentX, currentY + 1, RIGHT)) {
                       currentPositions.push((currentX, currentY + 1))
                   }
               }
               if (currentY - 1 >= 0 && !hasBeenVisited(currentX, currentY) && input[currentY - 1][currentX] === EMPTY) {
                    if (!isOnSightLine(currentX, currentY - 1, LEFT) && !isOnSightLine(currentX, currentY - 1, RIGHT)) {
                        currentPositions.push((currentX, currentY - 1))
                    }
            }
            if (currentX + 1 < inputLength && !hasBeenVisited(currentX, currentY) && input[currentY][currentX + 1] === EMPTY) {
                if (!isOnSightLine(currentX + 1, currentY, UP) && !isOnSightLine(currentX + 1, currentY, DOWN)) {
                    currentPositions.push((currentX + 1, currentY))
                }
            }
            if (currentX - 1 >= 0 && !hasBeenVisited(currentX, currentY) && input[currentY][currentX - 1] === EMPTY) {
                if (!isOnSightLine(currentX - 1, currentY, UP) && !isOnSightLine(currentX - 1, currentY, DOWN)) {
                    currentPositions.push((currentX - 1, currentY))
                }
            }
            if (currentPositions[currentPositions.length - 1][0] === inputLength - 1 && 
                currentPositions[currentPositions.length - 1][1] === inputHeight - 1) {
                    return true
                }
           }
           return false
}

cases.forEach((input) => {
    console.log(solution(input))
})