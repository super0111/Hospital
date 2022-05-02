import { useState, createContext } from 'react';

const Context = createContext();

const AppProvider = ({children}) => {
    const [statusUpdate, setStatusUpdate] = useState(false);
    return (
        <Context.Provider value={{statusUpdate, setStatusUpdate}}>
            {children}
        </Context.Provider>
    );
};

export { AppProvider, Context };
