import {useState} from "react";

interface MyButtonProps {
    /** 按钮文字 */
    title: string;
    /** 按钮是否禁用 */
    disabled: boolean;
    handleClick: any
}

function MyButton({title, disabled, handleClick}: MyButtonProps) {
    function handleClicked() {
        handleClick()
    }

    return (
        <button disabled={disabled} onClick={handleClicked}>{title}</button>
    );
}

export default function MyApp() {
    const [enabled, setEnabled] = useState(false);

    function handleClick() {
        setEnabled(!enabled)
    }

    return (
        <div>
            <h1>Welcome to my app</h1>
            <MyButton title="我是一个禁用按钮" disabled={enabled} handleClick={handleClick}/>
            <h1>Welcome to my app</h1>
            <MyButton title="我是一个禁用按钮" disabled={!enabled} handleClick={handleClick}/>
        </div>
    );
}
