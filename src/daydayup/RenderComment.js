import {useState} from "react";

function Mybutton({count, onClick, onMouseLeave}) {
    return <button onClick={onClick} onMouseLeave={onMouseLeave}>click me {count} times!</button>
}

export default function Myapp() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count + 1)
    }
    const handleLeave = () => {
      setCount(0)
    }
    return (<>
            <h1>Counters that update together</h1>
            <Mybutton count={count} onClick={handleClick} onMouseLeave={handleLeave}/>
            <Mybutton count={count} onClick={handleClick}/>
        </>
    )
}