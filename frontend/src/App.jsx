import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Registro from './pages/Register';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import styles from './App.module.css';
import HomeAdm from './pages/HomeAdm';

function AppRoutes() {
  const location = useLocation();
  const { user } = useAuth();
  const path = location.pathname.toLowerCase().replace(/\/+$/, '');
  const esconderNav = user && (path === '/home' || path === '/homeadm');

  return (
    <>
      {!esconderNav && (
        <nav className={styles.navbar}>
          <Link to="/registro" className={styles.navlink}>Criar conta</Link> |{' '}
          <Link to="/" className={styles.navlink}>Já tenho conta</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/homeadm" element={<PrivateRoute><HomeAdm /></PrivateRoute>} />
      </Routes>
    </>
  );
}


export default function App() {
  return (
    <AuthProvider>
        <AppRoutes />
    </AuthProvider>
  );
}
