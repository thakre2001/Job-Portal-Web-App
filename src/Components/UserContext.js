import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Services } from "../BackendAPIs/Services";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null);
    const [skills, setSkills] = useState([]);
    const [loading,setLoading]=useState(true)

    const navigate = useNavigate()

    const login = (data) => {
        setToken(data.token);
        setUser(data.user)

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))

        const res = Services.getAllSkills();
        // console.log(res.data)
        if (res.status === 200) {
            setSkills(res.data)
        }
    }

    const logout = () => {
        setToken(null)
        setUser(null)

        localStorage.removeItem('token');
        localStorage.removeItem('user');

        navigate('/page/login')
    }

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = localStorage.getItem("token");

            if (storedToken) {
                setToken(storedToken);

                try {

                    const userRes = await Services.getUserProfile(storedToken);
                    setUser(userRes.data);
                    localStorage.setItem('user', JSON.stringify(userRes.data));

                    const skillsRes = await Services.getAllSkills();
                    if (skillsRes.status === 200) {
                        setSkills(skillsRes.data);
                    }
                } catch (err) {
                    console.error("Failed to fetch user profile or skills", err);
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    setUser(null);
                    setToken(null);
                }
            } else {
                // navigate('/page/login');
            }
            setLoading(false)
        };

        fetchData();
    }, []);


    return (
        <UserContext.Provider value={{ token, user, login, logout, setToken, setUser, skills, loading }}>
            {children}
        </UserContext.Provider>
    )
}

