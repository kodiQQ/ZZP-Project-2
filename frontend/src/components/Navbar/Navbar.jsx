

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../axios/UserService.js';
import './Navbar.css';



function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const location = useLocation(); // hook do pobrania bieżącej lokalizacji

    // Logowanie bieżącej lokalizacji dla diagnostyki
    console.log('Current path:', location.pathname);

    const handleLogout = () => {
        const confirmDelete = window.confirm('Are you sure you want to logout this user?');
        if (confirmDelete) {
            UserService.logout();
        }
    };

    // Funkcja sprawdzająca, czy dany link jest aktualnie aktywny
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="navbar">
            <ul>
                <li className={isActive('/buy') ? 'active' : ''}>
                    <Link to="/task">Zadania</Link>
                </li>
                <li className={isActive('/rent') ? 'active' : ''}>
                    <Link to="/category">Kategorie</Link>
                </li>
                <li className={isActive('/information') ? 'active' : ''}>
                    <Link to="/status">Statusy</Link>
                </li>
                {/* {isAuthenticated && (
                    <li class={isActive('/profile') ? 'active' : ''}>
                        <Link to="/profile">Profile</Link>
                    </li>
                )} */}
                {/* {isAdmin && (
                    <li class={isActive('/admin/user-management') ? 'active' : ''}>
                        <Link to="/admin/user-management">Zarządzanie użytkownikami</Link>
                    </li>
                )} */}
                {/*{isAdmin && (*/}
                {/*    <li className={isActive('/admin/skin-management') ? 'active' : ''}>*/}
                {/*        <Link to="/admin/skin-management">Zarządzanie skinami</Link>*/}
                {/*    </li>*/}
                {/*)}*/}
                {isAuthenticated && (
                    <li>
                        <Link to="/" onClick={handleLogout}>Logout</Link>
                    </li>
                )}

                {!isAuthenticated && (
                    <li>
                        <Link to="/login" >Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;


