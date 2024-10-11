import { createContext, useContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types"


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (data) => {
        setUserData(data.user);
        setToken(data.token);
        // save to localStorage:
        localStorage.setItem('token', data.token);
    };

    const logout = () => {
        setUserData(null);
        setToken(null);
        // remove old token:
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ userData, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}


AuthContextProvider.propTypes = {
    children: PropTypes.any
}

