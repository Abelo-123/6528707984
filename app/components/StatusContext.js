import React, { createContext, useContext, useState } from 'react';

// Create the UserContext
const UserNotContext = createContext();

// Create a custom hook for easier access to the context
export const useNot = () => useContext(UserNotContext);

// Create a provider component
export const UserNotProvider = ({ children }) => {
    const [useNotification, setNotification] = useState({
        deposit: false,
        order: false,
        id: 0,
        notificationLoader: true,
        notificationData: [],
        notificationModal: false,
        notificationLight: false,
    });

    return (
        <UserNotContext.Provider value={{ useNotification, setNotification }}>
            {children}
        </UserNotContext.Provider>
    );
};
