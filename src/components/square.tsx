import type { SquareProps } from '../types'

export default function Square(props: SquareProps) {
    return (
        <>
            <button className="square" onClick={props.onClick}>
                {props.value}
            </button>
        </>
    )
}
