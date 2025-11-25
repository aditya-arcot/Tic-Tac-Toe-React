import { useState } from 'react'
import type { SquareValue } from '../types'
import Board from './board'

export default function Game() {
    const [history, setHistory] = useState<SquareValue[][]>([
        Array(9).fill(null),
    ])
    const [currentMove, setCurrentMove] = useState(0)
    const [ascending, setAscending] = useState(true)

    const isFirstPlayer = currentMove % 2 === 0
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const squares = history.at(currentMove)!

    function handleTurn(nextSquares: SquareValue[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    const moves = history.map((_, move) => {
        if (move === currentMove)
            // eslint-disable-next-line react-x/no-array-index-key
            return (
                <div key={move} style={{ fontSize: 14 }}>
                    Current Move
                </div>
            )

        let desc
        if (move > 0) {
            desc = 'Go to move #' + String(move)
        } else {
            desc = 'Go to game start'
        }

        return (
            // eslint-disable-next-line react-x/no-array-index-key
            <div key={move}>
                <button
                    onClick={() => {
                        handleJump(move)
                    }}
                >
                    {desc}
                </button>
            </div>
        )
    })
    const orderedMoves = ascending ? moves : [...moves].reverse()

    function handleJump(move: number) {
        setCurrentMove(move)
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    isFirstPlayer={isFirstPlayer}
                    squares={squares}
                    onTurn={handleTurn}
                />
            </div>
            <div className="game-info">
                <button
                    style={{ marginBottom: 5 }}
                    onClick={() => {
                        setAscending(!ascending)
                    }}
                >
                    Toggle Move Order
                </button>
                {orderedMoves}
            </div>
        </div>
    )
}
