import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import UserService from "../axios/UserService.js";

const Callback = () => {
    const { key } = useParams();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        console.log("wywoływanie useeffects w callbacku")
        console.log(key)
        // Wywołanie funkcji obsługującej dane po logowaniu
        UserService.handleCallback(key)
            .then((data) => setUserData(data))
            .catch((err) => console.error("Login callback error:", err));
    }, []);

    return (
        <div>
            {userData ? (
                <div>
                    <h2>Welcome, you are successfully logged in!</h2>
                    <pre>{JSON.stringify(userData, null, 2)}</pre>
                </div>
            ) : (
                <p>Logging in...</p>
            )}
        </div>
    );
};

export default Callback;
