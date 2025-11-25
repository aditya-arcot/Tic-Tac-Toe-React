import { type ReactElement } from 'react'
import type { BoardProps } from '../types'
import { calculateWinner } from '../utils'
import Square from './square'

export default function Board({ isFirstPlayer, squares, onTurn }: BoardProps) {
    const winner = calculateWinner(squares)
    let status
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        status = 'Next player: ' + (isFirstPlayer ? 'X' : 'O')
    }

    const handleClick = (index: number) => {
        if (squares[index] || calculateWinner(squares)) return
        const newSquareValues = squares.slice()
        newSquareValues[index] = isFirstPlayer ? 'X' : 'O'
        onTurn(newSquareValues)
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
                    onClick={() => handleClick(idx)}
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
