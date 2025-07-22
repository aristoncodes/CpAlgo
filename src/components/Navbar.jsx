import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg'; // (optional) your SVG logo
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

const Navbar = () => {
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    nav('/');
  };

  const navItems = [
    { to: '/problems', label: 'Problems' },
    { to: '/algorithms', label: 'Algorithms' },
    { to: '/tracker', label: 'Tracker' },
  ];

  return (
    <nav className="nav">
      <div className="nav-left">
        <h1 className="nav-title">CPAlgo</h1>
      </div>

      <ul className="nav-list">
        {navItems.map((item) => (
          <li key={item.to}>
            <Link
              to={item.to}
              className={`nav-link${pathname === item.to ? ' active' : ''}`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        {user ? (
          <button className="btn-outline" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/" className="btn-outline">Login</Link>
            <Link to="/signup" className="btn-solid">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
