import React, {createContext, useContext, useState} from 'react';

//const RolContext = createContext();
export const RolContext = createContext(null);

export const useRol = () => useContext(RolContext);

export const RolProvider = ({children}) => {
    const [rol, setRol] = useState('');//secretario
    return (
        <RolContext.Provider
            value={{
                rol,
                setRol
            }}>
            {children}
        </RolContext.Provider>
    );
};
