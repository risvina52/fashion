import React, { createContext, ReactNode } from "react";

export const ThemeContext = createContext<number | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

const ThemeProvider:React.FC<ThemeProviderProps> = ({ children }) => {
    return ( 
        <ThemeContext.Provider value={1}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;