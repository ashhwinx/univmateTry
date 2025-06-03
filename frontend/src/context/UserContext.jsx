import React, { useState, createContext } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {
    // Default user with section A (you can change this as needed)
    const [user, setUser] = useState({
        section: 'A',  // Default section
    });

    return (
        <UserDataContext.Provider value={{user, setUser}}>
            {children}
        </UserDataContext.Provider>
    )
}

export default UserContext