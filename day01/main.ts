#!/usr/bin/env ts-node-esm

import * as fs from 'fs'

const input = fs.readFileSync('./input.txt','utf-8')
/*const input = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`*/

const strDigits = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
const digits = strDigits.map( (_,index) => `${index+1}` )

console.info(input.split('\n').map((line) => {

    if (line === "") return 0

    // [[digit,pos],....]
    const findFirstPositions = (arr: string[]) =>  arr.map((value,index) =>
        [index+1,line.indexOf(value)]).filter(pair => pair[1] !== -1)
    const findLastPositions = (arr: string[]) =>  arr.map((value,index) =>
        [index+1,line.lastIndexOf(value)]).filter(pair => pair[1] !== -1)



    const anyDigitPositions = [
        ...findFirstPositions(strDigits),
        ...findLastPositions(strDigits),
        ...findFirstPositions(digits),
        ...findLastPositions(digits)
    ]
        .sort((pos1,pos2) => {
        if (pos1[1] === pos2[1]) {
            return 0
        }
        return pos1[1] < pos2[1] ? -1 : 0
    })


    const result = Number(`${anyDigitPositions[0][0]}${anyDigitPositions[anyDigitPositions.length - 1][0]}`)
    console.info(line, anyDigitPositions, result)
    return result

}).reduce((acc, currentValue) => acc + currentValue))





