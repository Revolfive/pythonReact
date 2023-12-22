import {useState, useCallback} from 'react';

export default function MyAppCallback() {
    const [value, setValue] = useState("Change me");

    const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>((event) => {
        setValue(event.currentTarget.value);
    }, [setValue])

    return (
        <>
            <input value={value} onChange={handleChange}/>
            <p>值： {value}</p>
        </>
    );
}