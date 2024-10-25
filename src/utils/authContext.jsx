import { createContext } from "react";
import { useState } from "react";
import PropTypes from "prop-types"


export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const login = (data) => {
        setUserData(data.user);
        setToken(data.token);
        console.log('expiration time:', data.expiresIn)
        // save to localStorage:
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('user in Auth:', JSON.parse(localStorage.getItem('user')))
    };

    const logout = () => {
        setUserData(null);
        setToken(null);
        // remove old token:
        localStorage.removeItem('token');
        localStorage.removeItem('user')
    };

    return (
        <AuthContext.Provider value={{ userData, token, login, logout }}>
        {/* </AuthContext.Provider><AuthContext.Provider value={{ login, logout }}> */}
            {children}
        </AuthContext.Provider>
    );
}


AuthContextProvider.propTypes = {
    children: PropTypes.any
}

