import { createContext } from "react";
import { useState } from "react";
import { redirect } from "react-router-dom";
import PropTypes from "prop-types"




export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [pageLoading, setPageLoading] = useState(false)

    const login = (data) => {
        setUserData(data.user);
        setToken(data.token);
        // save to localStorage:
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        // console.log('user in Auth:', JSON.parse(localStorage.getItem('user')))
        return data.user
    };

    const logout = () => {
        setUserData(null);
        setToken(null);
        // remove old token:
        localStorage.removeItem('token');
        localStorage.removeItem('user')
        redirect('/profile/login')
    };

    return (
        <AuthContext.Provider 
            value={{ userData, token, login, logout, pageLoading, setPageLoading }}
        >
            {children}
        </AuthContext.Provider>
    );
}


AuthContextProvider.propTypes = {
    children: PropTypes.any
}

