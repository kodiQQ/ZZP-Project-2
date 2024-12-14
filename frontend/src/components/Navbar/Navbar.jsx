

import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserService from '../../axios/UserService.js';
import './Navbar.css';
import userService from "../../axios/UserService.js";



function Navbar() {
    const isAuthenticated = UserService.isAuthenticated();
    const isAdmin = UserService.isAdmin();
    const location = useLocation(); // hook do pobrania bieżącej lokalizacji
    const [name, setName] = useState("");

    const fetchName = async () => {
        try {
            const response = await userService.getUser(sessionStorage.getItem("token"));

            setName(response);
        } catch (error) {
            console.error('Error fetching skins:', error);
        }
    };
    useEffect(() => {
        fetchName();
    }, []);

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
        <div>
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
                        <>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/register">Register</Link>
                            </li>
                        </>

                    )}
                </ul>
            </nav>
            <nav style={{backgroundColor: "white"}} className="navbar">
                <ul>

                    <li>
                    <Link style={{ backgroundColor: "blue" }} to="/status">Witaj {name} </Link>
                    </li>

                </ul>
            </nav>
        </div>

    );
}

export default Navbar;


