import React, { createContext, useState, useContext, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : {};
    });

    console.log(user);

    // update localStorage when user changes
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        console.log(user);
        if (savedUser) {
            const currentUser = JSON.parse(savedUser);
            console.log('Updating user from localStorage:', currentUser);
            setUser(currentUser);
        }
    }, []);

    // logging user for test purposes
    console.log(user);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
