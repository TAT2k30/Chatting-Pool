import { useEffect, useState } from 'react';
import axios from 'axios';
import { error } from 'console';

interface User {
    id: number;
    email: string;
    message: any[];
    name: string;
    password: string;
}
function useClient() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        try {
            const response = await axios.post(
                'http://localhost:8080/WCSB3/api/users/login',
                {
                    email: email,
                    password: password
                },
            );
            const { data: { id, name, email: userEmail } } = response;
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify({ id, name, email }));
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const signup = async (name: string, email: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/WCSB3/api/users/signup', {
                name,
                email,
                password
            });
            setUser(response.data);
            localStorage.setItem("user", JSON.stringify(response.data));
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const checkLogin = () => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            setUser(null);
        }
    };
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
    }
    useEffect(() => {
        checkLogin();
    }, []);

    const isLoggedIn = (): boolean => {
        const userData = localStorage.getItem("user");
        return user !== null || userData !== null ;
    };

    return { user, isLoggedIn, login, signup, logout };
}

export default useClient;
