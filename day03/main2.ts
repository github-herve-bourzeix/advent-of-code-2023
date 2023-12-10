#!/usr/bin/env ts-node-esm

import * as fs from 'fs'

const input = fs.readFileSync('./input.txt', 'utf-8')

const lines = input.split('\n')
const matrix = lines.map(line => line.split(''))


const findNumbers = (matrix: string[][]): { numberFound: number, positions: position[] }[] => {
    const acc: { numberFound: number, positions: position[] }[] = []
    let numberPos: position[] = []
    let currentNumber: number[] = []
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (/\d/.test(matrix[x][y])) {
                numberPos.push([x, y])
                currentNumber.push(Number(matrix[x][y]))
            } else {
                if (currentNumber.length > 0) {
                    acc.push({
                        numberFound: Number(currentNumber.join('')),
                        positions: numberPos
                    })
                    currentNumber = []
                    numberPos = []
                }
            }
        }
    }

    return acc
}

type position = [number, number]

const addPos = (p1: position, p2: position): position => [p1[0] + p2[0], p1[1] + p2[1]]
const relativePointAround: position[] = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]

const posEq = ([x1,y1]: position, [x2,y2]: position) => x1 == x2 && y1 ==y2

const computeCandidate = (p:position) => {
    return relativePointAround.map(rp => addPos(rp,p)).filter(cp => /\d/.test(matrix[cp[0]][cp[1]]))
}


const spotSymbolAroundPosition = (numberFound: number, matrix: string[][], p: position) => {

    // * * *
    // * x *
    // * * *



    return relativePointAround.some(rp => {
        const [x, y] = addPos(p, rp)
        if (matrix[x] === undefined
            || matrix[x][y] === undefined) {
            // console.info("reject",numberFound)
            return false
        }
        if (!/\d/.test(matrix[x][y]) && matrix[x][y] !== '.') {
            return true
        }
        // console.info("reject",numberFound)
        return false
    })
}

const findSymbols = (matrix: string[][]): position[] => {
    const acc: position[] = []
    for (let x = 0; x < matrix.length; x++) {
        for (let y = 0; y < matrix[x].length; y++) {
            if (!/\d/.test(matrix[x][y]) && matrix[x][y] !== '.')
                acc.push([x,y])
        }
    }
    return acc
}


const filtered = findNumbers(matrix).filter(
    ({numberFound, positions}) => positions.some(position => spotSymbolAroundPosition(numberFound, matrix, position)))

//console.info(filtered)

const gearCandidates =
    findSymbols(matrix).map(p => {
    // console.info("Analyse ",matrix[p[0]][p[1]])
    const candidates  = computeCandidate(p)
    return filtered
        .filter( ({numberFound,positions}) =>
            positions.some( p1 =>
                candidates.some( p2 => posEq(p1,p2))))
})

const gears = gearCandidates.filter(x => x.length == 2)
// console.info(gears)
const gearsRatios =
    gears.reduce( (acc,gears) => {
        const gearsNumbers = gears.map(({numberFound}) => numberFound)
        // console.info(gearsNumbers)
        const gearRatio = gearsNumbers.reduce((previousGear, gearNumber) => previousGear*gearNumber,1)
        // console.info(gearRatio,)
        return acc + gearRatio
    },0)

console.info("gearsRatios",gearsRatios)



