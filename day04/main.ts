#!/usr/bin/env ts-node-esm

import * as fs from 'fs'

const input = fs.readFileSync('./input.sample.txt', 'utf-8')

console.info(input.split('\n').filter(line => line !== "").map((line) => {
        const [, cardNumberStr, ownCardsStr, winningCardsStr] = /Card \s*(\d+):((?:\s*\d+\s*)+)\|((?:\s*\d+\s*)+)/.exec(line) || []
        //console.info(cardNumberStr, ownCardsStr.length+1, winningCardsStr.length+1)
        const result = {
            cardNumber: Number(cardNumberStr),
            ownCard: ownCardsStr.trim().replaceAll('  ', ' ').split(' ').map(value => Number(value)),
            winningCards: winningCardsStr.trim().replaceAll('  ', ' ').split(' ').map(value => Number(value)),
        }
        //console.info(result.ownCard.length,result.winningCards.length)
        return result

    }
).map(({ownCard, winningCards}) => ownCard.filter(x => winningCards.includes(x)))
    .map((commonValues) => {

        const points =  commonValues.reduce((points, currentValue, currentIndex) => {
            if (currentIndex <= 1) {
                return points + 1
            }
            return points + (currentIndex-1) * 2
        }, 0)
        console.info(commonValues,'->',points)
        return points
    }).reduce((points, currentPoint) => points + currentPoint, 0))
