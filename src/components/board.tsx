import { type ReactElement } from 'react'
import type { BoardProps } from '../types'
import { calculateWinner } from '../utils'
import Square from './square'

export default function Board({ isFirstPlayer, squares, onTurn }: BoardProps) {
    const result = calculateWinner(squares)
    let status
    if (result?.winner) {
        status = 'Winner: ' + result.winner
    } else {
        status = 'Next player: ' + (isFirstPlayer ? 'X' : 'O')
    }

    const handleClick = (index: number) => {
        if (squares[index] || calculateWinner(squares)) return
        const newSquareValues = squares.slice()
        newSquareValues[index] = isFirstPlayer ? 'X' : 'O'
        onTurn(newSquareValues)
    }

    const getHighlight = (index: number): boolean => {
        if (!result) return false
        return result.line.includes(index)
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
