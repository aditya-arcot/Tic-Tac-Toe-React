import { useState, type ReactElement } from 'react'
import Square from './Square'

type SquareValue = string | null

export default function Board() {
    const [squareValues, setSquareValues] = useState<SquareValue[]>(
        Array(9).fill(null)
    )

    const handleSquareClick = (index: number) => {
        const newSquareValues = squareValues.slice()
        newSquareValues[index] = 'X'
        setSquareValues(newSquareValues)
    }

    const rows: ReactElement[] = []
    for (let i = 0; i < 3; i++) {
        rows.push(
            <div className="board-row">
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

    return <>{rows}</>
}
