"use client"
import React, { createContext, useState, useContext } from 'react';

// Create the context
const ActivePageContext = createContext();

// Create the provider component
export const ActivePageProvider = ({ children }) => {
    const [activePage, setActivePage] = useState(1);

    // Function to update the active page
    const updateActivePage = (page) => {
        setActivePage(page);
    };

    return (
        <ActivePageContext.Provider value={{ activePage, updateActivePage }}>
            {children}
        </ActivePageContext.Provider>
    );
};

// Custom hook to use the ActivePageContext
export const useActivePage = () => {
    return useContext(ActivePageContext);
};
