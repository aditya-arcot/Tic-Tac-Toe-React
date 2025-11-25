export type SquareValue = string | null

export interface BoardProps {
    isFirstPlayer: boolean
    squares: SquareValue[]
    onTurn: (squares: SquareValue[]) => void
}

export interface SquareProps {
    value: string | null
    onClick: () => void
    highlight: boolean
}

export interface GameResult {
    gameOver: boolean
    winner?: string
    winningLine?: number[]
}
