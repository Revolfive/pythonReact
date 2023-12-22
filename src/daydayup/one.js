import {useState} from "react";
import "./one.css"

const message = "this is message"
let list = [
    {id: 1001, name: "Vue"},
    {id: 1002, name: "React"},
    {id: 1003, name: "Angular"}
]

const isLogin = true

const articleType = 1  // 0 1 3

function getArticleType() {
    if (articleType === 0) {
        return <div>无图模式</div>
    } else if (articleType === 1) {
        return <div>单图模式</div>
    } else {
        return <div>多图模式</div>
    }

}

const handleClick1 = () => {
    console.log("button被点击了")
}
const handleClick2 = (data, e) => {
    console.log("button被点击了", data, e)
}

function cal_2() {
    return (isLogin && <span>this is span</span>)
}

function cal_3() {
    return (isLogin ? <span>loading...</span> : <span>this is span</span>)
}

function cal_all(a) {
    return (<span>{"loading..." + a}</span>)
}

function getname() {
    return (<d>{list.map(item => <dd key={item.id}>{item.name}</dd>)}</d>)
}

const Button = () => {
    return <button>click me!</button>
}

export function IntStatu() {
    const [count, setCount] = useState(0)
    const handleClick = () => {
        setCount(count + 1)
    }
    return (<div className="App">
        <button onClick={handleClick}>{count}</button>
        <div>{cal_all(count)}</div>
    </div>);
}

export function ListStatu() {
    const [arr, setArr] = useState(list);
    const changeDict = () => {
        setArr((prev) => {
            prev[0].id = prev[0].id + 1
            return prev.slice();
        })
    }
    return (<div className="App">
        <button onClick={changeDict}>{arr[0].id}</button>
        <div>{cal_all(arr[0].id)}</div>
    </div>);
}

export function DictStatu() {
    const [arr, setArr] = useState({name: "joy", id: 0});
    const changeName = () => {
        setArr({
            ...arr,
            id: arr.id + 1
        })
    }
    return (
        <div>
            <button onClick={changeName}>{arr.id}</button>
            <div>{cal_all(arr.id)}</div>
        </div>
    )
}

const style = {color: "red", fontSize: "50px", textAlign:"center"}

export function CssExp() {
    return (
        <div>
            {/*行内样式控制*/}
            <div style={style}>this is span</div>
            <div className="foo">this is class foo</div>
        </div>
    )
}
