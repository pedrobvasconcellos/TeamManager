import {createContext, useContext, useState, useEffect} from 'react';

const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const nome = localStorage.getItem('nome');
        const id = localStorage.getItem('id');

        if(token && nome && id){
            setUser({token, nome, id});
        }
    }, []);

    const login = ({ token, nome, id }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('nome', nome);
        localStorage.setItem('id', id);

        setUser({ nome, token, id });
    };

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}