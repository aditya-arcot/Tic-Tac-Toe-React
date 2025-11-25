import { type ReactElement } from 'react'
import type { BoardProps } from '../types'
import { getGameResult } from '../utils'
import Square from './square'

export default function Board({ isFirstPlayer, squares, onTurn }: BoardProps) {
    const result = getGameResult(squares)
    let status
    if (result.winner) {
        status = 'Winner: ' + result.winner
    } else if (!result.gameOver) {
        status = 'Next player: ' + (isFirstPlayer ? 'X' : 'O')
    } else {
        status = 'Game Over: Draw'
    }

    const handleClick = (index: number) => {
        if (squares[index] || getGameResult(squares).gameOver) return
        const newSquareValues = squares.slice()
        newSquareValues[index] = isFirstPlayer ? 'X' : 'O'
        onTurn(newSquareValues)
    }

    const getHighlight = (index: number): boolean => {
        return result.winningLine?.includes(index) ?? false
    }

    const rows: ReactElement[] = []
    for (let row = 0; row < 3; row++) {
        const cols: ReactElement[] = []
        for (let col = 0; col < 3; col++) {
            const idx = row * 3 + col
            cols.push(
                <Square
                    key={idx}
                    value={squares[idx]}
                    onClick={() => {
                        handleClick(idx)
                    }}
                    highlight={getHighlight(idx)}
                />
            )
        }
        rows.push(
            <div className="board-row" key={row}>
                {cols}
            </div>
        )
    }

    return (
        <>
            <div className="status">{status}</div>
            {rows}
        </>
    )
}
