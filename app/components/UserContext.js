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
        userId: undefined,
    });

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
};
