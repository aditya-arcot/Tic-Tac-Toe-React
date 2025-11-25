import type { SquareProps } from '../types'

export default function Square(props: SquareProps) {
    return (
        <>
            <button
                className={`square ${props.highlight ? 'highlight' : ''}`}
                onClick={props.onClick}
            >
                {props.value}
            </button>
        </>
    )
}
