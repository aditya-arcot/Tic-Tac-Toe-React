import { useState } from 'react'

export default function Square() {
    const [val, setVal] = useState<string | null>(null)

    const handleClick = () => {
        setVal('X')
    }

    return (
        <>
            <button className="square" onClick={handleClick}>
                {val}
            </button>
        </>
    )
}
