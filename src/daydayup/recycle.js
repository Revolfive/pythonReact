// 项目的根组件
import MyApp from "../productiontable/aa.tsx";
import MyAppReducer from "../hook/myuseReducer.tsx";
import MyAppContext from "../hook/myuseContext.tsx";
import MyAppCallback from "../hook/myuseCallback.tsx";
import {useState} from "react";

export function MyButton() {
    const [state, setState] = useState(0);

    function handleClick() {
        console.log(state)
        setTimeout(() => {
            setState(state + 1)
        }, 1000)  // 在控制台能看到1s中鼠标点击的次数
    }

    return (
        <button onClick={handleClick}>click me!</button>
    )
}

function Example() {
    return <div>
        <h5>禁用按钮</h5>
        <MyApp/>
        <h5>单位时间点击次数</h5>
        <MyButton/>
        <h5>useReducer示例</h5>
        <MyAppReducer/>
        <h5>useContext示例</h5>
        <MyAppContext/>
        <h5>useCallback 示例</h5>
        <MyAppCallback/>
    </div>
}

export default Example