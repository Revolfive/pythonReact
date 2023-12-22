import {createContext, useContext, useState} from 'react';

type Theme = "light" | "dark" | "system";
const ThemeContext = createContext<Theme>("system");

const useGetTheme = () => useContext(ThemeContext);

export default function MyAppContext() {
    const [theme, setTheme] = useState<Theme>('light');
    return (
        <ThemeContext.Provider value={theme}>
            <MyComponent/>
        </ThemeContext.Provider>
    )
}

function MyComponent() {
    const theme = useGetTheme();

    return (
        <div>
            <p>当前主题：{theme}</p>
        </div>
    )
}
