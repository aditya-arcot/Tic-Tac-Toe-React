export type SquareValue = string | null

export type BoardProps = {
    isFirstPlayer: boolean
    squares: SquareValue[]
    onTurn: (squares: SquareValue[]) => void
}

export type SquareProps = {
    value: string | null
    onClick: () => void
}
