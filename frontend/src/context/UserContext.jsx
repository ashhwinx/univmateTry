import React, { useState, useEffect, createContext } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState(() => {
        try {
            // Try to load user from localStorage on first render
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : {
                email: '',
                fullname: '',
                section: '',
            };
        } catch (error) {
            // If there's any error parsing the stored data, return default user
            console.error('Error loading user data:', error);
            return {
                email: '',
                fullname: '',
                section: '',
            };
        }
    });

    // Whenever user changes, update localStorage
    useEffect(() => {
        try {
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }, [user]);

    return (
        <UserDataContext.Provider value={{user, setUser}}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext