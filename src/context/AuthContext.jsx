import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Check localStorage on mount
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem('cozyUser');
        return saved ? JSON.parse(saved) : null;
    });

    const login = async (email, password) => {
        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();

            if (res.ok) {
                setUser(data.user);
                localStorage.setItem('cozyUser', JSON.stringify(data.user));
                return { success: true };
            } else {
                return { success: false, msg: data.msg };
            }
        } catch (err) {
            console.error(err);
            return { success: false, msg: "Server Error" };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('cozyUser');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
