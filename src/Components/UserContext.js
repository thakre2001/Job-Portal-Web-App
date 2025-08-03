import React, { Children, createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "../BackendAPIs/Services";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null);

    const navigate = useNavigate()

    const login = (data) => {
        setToken(data.token);
        setUser(data.user)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
    }

    const logout = () => {
        setToken(null)
        setUser(null)

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/page/login')
    }

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
            
            Services.getUserProfile(storedToken).then((res)=>{
                setUser(res.data)
                localStorage.setItem('user',JSON.stringify(res.data))
            })
        }
    }, []);

    return (
        <UserContext.Provider value={{ token, user, login, logout ,setToken, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

