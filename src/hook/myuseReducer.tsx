import {useReducer} from 'react';

interface State {
    count: number
    action: string
}

type CounterAction =
    | { type: "reset" }
    | { type: "setCount"; value: State["count"] }

const initialState: State = {count: 0, action: null};

function stateReducer(state: State, action: CounterAction): State {
    switch (action.type) {
        case "reset":
            return {...initialState, action:action.type};
        case "setCount":
            return {...state, count: action.value, action:action.type};
        default:
            throw new Error("Unknown action");
    }
}

export default function MyAppReducer() {
    const [state, dispatch] = useReducer(stateReducer, initialState);

    const addFive = () => dispatch({type: "setCount", value: state.count + 5});
    const reset = () => dispatch({type: "reset"});
    console.log(state)
    return (
        <div>
            <h1>欢迎来到我的计数器</h1>
            <p>{"计数：" + state.count}</p>
            <p>{"计数：" + state.count / 5}</p>
            <button onClick={addFive}>加 5</button>
            <button onClick={reset}>重置</button>
        </div>
    );
}

