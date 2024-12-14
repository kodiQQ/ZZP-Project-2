import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  Navbar  from "./components/Navbar/Navbar.jsx";
// import  Footer  from "./components/Footer/Footer.jsx";
import {Toaster} from "react-hot-toast";

import LoginPage from "./auth/LoginPage.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";
import TaskPage from "./pages/TaskPage/TaskPage.jsx"
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx"
import StatusPage from "./pages/StatusPage/StatusPage.jsx"
import UserService from "./axios/UserService.js";




function AppRoutes() {
    const renderLayout = (Component) => (
        <div className='App'>
            <div className='navbar'>
                <Navbar/>
            </div>
            <div className='content-wrapper'>
                <Component/>
            </div>
            {/*<div className='footer'>*/}
            {/*    <Footer/>*/}
            {/*</div>*/}
        </div>
    );

    return (
        <Router>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <Routes>
                <Route exact path="/status" element={renderLayout(StatusPage)} />
                <Route exact path="/login" element={renderLayout(LoginPage)} />
                <Route exact path="/register" element={renderLayout(RegisterPage)} />
                <Route exact path="/task" element={renderLayout(TaskPage)} />
                <Route exact path="/category" element={renderLayout(CategoryPage)} />
                {UserService.adminOnly() && (
                    <>
                    </>
                )}
                <Route path="*" element={<Navigate to="/login" />} />‰
            </Routes>
            {/*<ContinueLoginWithGoogle />*/}
        </Router>
    );
}

export default AppRoutes;
