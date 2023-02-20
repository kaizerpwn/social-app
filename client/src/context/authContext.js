import { createContext, useState, useEffect } from "react"

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = () => {
        //login
        setCurrentUser({ id: 1, name: "Ibrahim Okic", profilePic: "https://images.pexels.com/photos/3754687/pexels-photo-3754687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" });
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login }}>{children}</AuthContext.Provider>
    )
}