import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        //login
        const res = await axios.post("http://localhost:8800/api/auth/login", inputs, {
            withCredentials: true
        });
        console.log(res);
        setCurrentUser(res.data);
        // setCurrentUser({ id: 1, name: "Ibrahim Okic", profilePic: "https://images.pexels.com/photos/3754687/pexels-photo-3754687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" });
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>{children}</AuthContext.Provider>
    )
}