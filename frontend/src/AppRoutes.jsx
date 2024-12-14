import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import  Navbar  from "./components/Navbar/Navbar.jsx";
// import  Footer  from "./components/Footer/Footer.jsx";
import {Toaster} from "react-hot-toast";
// import ContinueLoginWithGoogle from "./components/ContinueLoginWithGoogle.jsx";
// import UpdateUser from "./components/UpdateUser.jsx";
// import UserManagementPage from "./components/UserManagementPage.jsx";
import SkinManagementPage from "./admin/SkinManagementPage/SkinManagementPage.jsx";
import RentPage from "./pages/RentPage/RentPage.jsx";
import BuyPage from "./pages/BuyPage/BuyPage.jsx";
// import ProfilePage from "./components/ProfilePage.jsx";
import InformationPage from "./pages/InformationPage/InformationPage.jsx";
import LoginPage from "./auth/LoginPage.jsx";
import RegisterPage from "./auth/RegisterPage.jsx";
import TaskPage from "./pages/TaskPage/TaskPage.jsx"
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx"
import StatusPage from "./pages/StatusPage/StatusPage.jsx"
import UserService from "./axios/UserService.js";
import Callback from "./auth/Callback.jsx";
// import {AdminPanel} from "./admin/AdminPanel.jsx";



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
                {/*<Route exact path="/" element={<Navigate to="/information" />} />*/}
                <Route exact path="/status" element={renderLayout(StatusPage)} />
                <Route exact path="/login" element={renderLayout(LoginPage)} />
                <Route exact path="/login" element={renderLayout(RegisterPage)} />
                <Route exact path="/task" element={renderLayout(TaskPage)} />
                <Route exact path="/category" element={renderLayout(CategoryPage)} />
                {/*<Route exact path="/information" element={renderLayout(InformationPage)} />*/}

                {/*<Route exact path="/callback/:key" element={<Callback />} />*/}
                {/*<Route path="/profile" element={<ProfilePage />} />*/}
                {/*<Route path="/buy" element={renderLayout(BuyPage)} />*/}
                {/*<Route path="/rent" element={renderLayout(RentPage)} />*/}
                {/* <Route path="/buy" element={<BuyPage />} /> */}

                {/* Check if user is authenticated and admin before rendering admin-only routes */}
                {UserService.adminOnly() && (
                    <>
                        {/* <Route path="/register" element={<RegistrationPage />} /> */}
                        {/*<Route path="/admin/skin-management" element={<SkinManagementPage />} />*/}
                        {/*<Route path="/admin/user-management" element={<UserManagementPage />} />*/}
                        {/*<Route path="/update-user/:userId" element={<UpdateUser />} />*/}
                    </>
                )}
                <Route path="*" element={<Navigate to="/login" />} />‰
            </Routes>
            {/*<ContinueLoginWithGoogle />*/}
        </Router>
    );
}

export default AppRoutes;
