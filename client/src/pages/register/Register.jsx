import './register.css';
import {Link} from 'react-router-dom';
import {useState, useCallback} from 'react';
import * as api from './../../api/index.js';
import {useHistory} from 'react-router-dom';
export default function Register() {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const handleSubmit = useCallback(async (e) =>{
        e.preventDefault();
        try {
            const user = {
                username: username,
                email: email,
                password: password,
            }
            await api.registerUser(user);
            setError(false);
            // window.location.replace('/login');
            history.push("/login");

        } catch (error) {
            console.log(error);
            setError(true);
        }

    },[username, email, password, history])
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form  className="registerForm">
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your Username" />
                <label>Email</label>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your Email" />
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" />
                <button onClick={handleSubmit} className="registerButton">Register</button>
            </form>
            <Link to="/login">
                <button className="loginRegisterButton">Login</button>
            </Link>
            {error && <span style={{ color: 'red', marginTop: '10px'}}>Something went wrong...</span>}
        </div>
    )
}
