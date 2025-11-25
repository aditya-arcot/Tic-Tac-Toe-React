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
    for (let i = 0; i < 3; i++) {
        rows.push(
            // safe to use index as key since rows are static
            <div className="board-row" key={i}>
                <Square
                    value={squares[i * 3]}
                    onClick={() => handleClick(i * 3)}
                />
                <Square
                    value={squares[i * 3 + 1]}
                    onClick={() => handleClick(i * 3 + 1)}
                />
                <Square
                    value={squares[i * 3 + 2]}
                    onClick={() => handleClick(i * 3 + 2)}
                />
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
