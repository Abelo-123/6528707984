import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserContext = createContext();

// Create a custom hook for easier access to the context
export const useUser = () => useContext(UserContext);

// Create a provider component
export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        userId: null, //userId: undefined,
        balance: 10,
        father: 6528707984,
        rate: 10,
        allrate: 200,
        deposit: 5,
        disabled: "2410,2411",
        profile: "https://png.pngtree.com/png-clipart/20230511/ourmid/pngtree-isolated-cat-on-white-background-png-image_7094927.png"

    });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
