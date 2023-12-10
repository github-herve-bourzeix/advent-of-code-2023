#!/usr/bin/env ts-node-esm

import * as fs from 'fs'

const input = fs.readFileSync('./input.txt','utf-8')


const result = input.split('\n').map( (line) => {

    if (line === "") return 0

    const [match,gameId,strPlays] = /^Game (\d+): (.*)$/.exec(line) ?? []
    const plays = strPlays.split('; ')

    const bagCounts = plays.map( play => {
            const [,redCount] = /(?:(\d+) red)/.exec(play) ?? ["","0"]
            const [,blueCount] = /(?:(\d+) blue)/.exec(play) ?? ["","0"]
            const [,greenCount] = /(?:(\d+) green)/.exec(play) ?? ["","0"]

        return {
            redCount : Number(redCount),
                blueCount: Number(blueCount),
                greenCount: Number(greenCount)
        }

        }
    )

    const bagConfig = {
        redCount: 12,
        greenCount: 13,
        blueCount:14
    }


    const minRedCount = Math.max(...bagCounts.map(({redCount}) => redCount).filter( x => x !==0))
    const minGreenCount = Math.max(...bagCounts.map(({greenCount}) => greenCount).filter( x => x !==0))
    const minBlueCount = Math.max(...bagCounts.map(({blueCount}) => blueCount).filter( x => x !==0))



    /*if (minRedCount > bagConfig.redCount || minGreenCount > bagConfig.greenCount || minBlueCount > bagConfig.blueCount) {
        return 0
    }*/
    console.info(minRedCount,minGreenCount,minBlueCount)
    return minRedCount*minGreenCount*minBlueCount


}).reduce( (acc, gameId) => acc + gameId,0)


console.info(result)
