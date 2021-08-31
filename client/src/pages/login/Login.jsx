import './login.css';
import {Link} from 'react-router-dom';
import {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from './../../redux/actions/authActions.js';
import { useHistory } from 'react-router-dom';
import {errorState$, isLoadingState$} from './../../redux/selectors/index.js';
export default function Login() {
    const error = useSelector(errorState$);
    const isLoading = useSelector(isLoadingState$);
    const history = useHistory();
    const dispatch =  useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const user= {
            email: email,
            password: password,
        }
        dispatch(authActions.loginProcess.loginRequest(user));
        history.push('/');
    },[email, password, dispatch, history])
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form  className="loginForm">
                <label>Username</label>
                <input value={email}  onChange={(e) => setEmail(e.target.value)} type="text" placeholder="Enter your email" />
                <label>Password</label>
                <input value={password}  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" />
                {isLoading
                ? <button className="loginButton" disabled="disabled">Login Processing...</button>
                :<button onClick={handleSubmit} className="loginButton">Login</button>}
            </form>
            <Link to="/register">
                <button className="loginRegister">Register</button>
            </Link>
            {error && <span style={{ color: 'red', marginTop: '10px' }}>Email or Password was wrong...</span>}
        </div>
    )
}
