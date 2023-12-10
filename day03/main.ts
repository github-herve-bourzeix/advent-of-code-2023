#!/usr/bin/env ts-node-esm

import * as fs from 'fs'

const input = fs.readFileSync('./input.sample.txt', 'utf-8')

const lines = input.split('\n')
const matrix = lines.map(line => line.split(''))


const findSymbols = (matrix: string[][]): { numberFound: number, positions: position[] }[] => {
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

const spotSymbolAroundPosition = (numberFound:number,matrix: string[][], p: position) => {

    // * * *
    // * x *
    // * * *

    const relativePointAround: position[] = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1],[0,-1]]

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






const filtered = findSymbols(matrix).filter(
    ({numberFound,positions}) => positions.some(position => spotSymbolAroundPosition(numberFound,matrix, position)))

console.info(filtered)

console.info("result",
    filtered.reduce((acc,value) => acc+value.numberFound,0)
)



