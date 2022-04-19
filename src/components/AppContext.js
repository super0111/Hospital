import { useState, createContext } from 'react';

const Context = createContext();

const AppProvider = ({children}) => {
    const [token, setToken] = useState('');
    return (
        <Context.Provider value={{token, setToken}}>
            {children}
        </Context.Provider>
    );
};

export { AppProvider, Context };
