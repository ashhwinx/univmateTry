
import React, { useState, useEffect, createContext } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState(() => {
        // Try to load user from localStorage on first render
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : {
            email: '',
            fullname: '',
            section: '',
            semester: ''
        };
    });

    // Whenever user changes, update localStorage
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    return (
        <UserDataContext.Provider value={{user, setUser}}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext