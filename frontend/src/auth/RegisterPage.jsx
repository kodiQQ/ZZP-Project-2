
import { useState } from 'react';
import axios from 'axios';
import UserService from "../axios/UserService.js";

const RegisterForm = () => {
    const [register, setRegister] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        // event.preventDefault();
        setError(null);
        UserService.register(register, password);

    };

    return (
        <div style={{maxWidth: '400px', margin: '0 auto', padding: '1rem'}}>

            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '1rem'}}>
                    <label htmlFor="register" style={{display: 'block', marginBottom: '.5rem'}}>Email:</label>
                    <input
                        type="text"
                        id="register"
                        value={register}
                        onChange={(e) => setRegister(e.target.value)}
                        required
                        style={{width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
                    />
                </div>
                <div style={{marginBottom: '1rem'}}>
                    <label htmlFor="password" style={{display: 'block', marginBottom: '.5rem'}}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{width: '100%', padding: '.5rem', borderRadius: '4px', border: '1px solid #ccc'}}
                    />
                </div>
                {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
                <button type="submit" style={{
                    padding: '.5rem 1rem',
                    borderRadius: '4px',
                    border: 'none',
                    backgroundColor: '#007BFF',
                    color: '#fff'
                }}>
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;

