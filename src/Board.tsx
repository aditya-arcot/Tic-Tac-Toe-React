import { useState, type ReactElement } from 'react'
import Square from './Square'

type SquareValue = string | null

const calculateWinner = (squareValues: SquareValue[]): string | null => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squareValues[a] &&
            squareValues[a] === squareValues[b] &&
            squareValues[a] === squareValues[c]
        ) {
            return squareValues[a]
        }
    }
    return null
}

export default function Board() {
    const [isFirstPlayer, setIsFirstPlayer] = useState(true)
    const [squareValues, setSquareValues] = useState<SquareValue[]>(
        Array(9).fill(null)
    )

    const winner = calculateWinner(squareValues)
    let status
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        status = 'Next player: ' + (isFirstPlayer ? 'X' : 'O')
    }

    const handleSquareClick = (index: number) => {
        if (squareValues[index] || calculateWinner(squareValues)) return
        const newSquareValues = squareValues.slice()
        newSquareValues[index] = isFirstPlayer ? 'X' : 'O'
        setIsFirstPlayer(!isFirstPlayer)
        setSquareValues(newSquareValues)
    }

    const rows: ReactElement[] = []
    for (let i = 0; i < 3; i++) {
        rows.push(
            <div className="board-row" key={i}>
                <Square
                    value={squareValues[i * 3]}
                    onClick={() => handleSquareClick(i * 3)}
                />
                <Square
                    value={squareValues[i * 3 + 1]}
                    onClick={() => handleSquareClick(i * 3 + 1)}
                />
                <Square
                    value={squareValues[i * 3 + 2]}
                    onClick={() => handleSquareClick(i * 3 + 2)}
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
