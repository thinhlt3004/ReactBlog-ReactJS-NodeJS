
import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {userState$ } from './redux/selectors/index.js';
import * as authActions from './redux/actions/authActions.js';
function App() {
  const dispatch = useDispatch();
  const user = useSelector(userState$);
  useEffect(() => {
    if(localStorage.getItem('token') !== null){
      dispatch(authActions.getUserProccess.getUserRequest());
    }
  },[dispatch])

  return (
    <Router>
        <Topbar/> 
      <Switch>
        <Route exact path="/">
          {user ? <Home/> : <Redirect to="/login"/>}
        </Route>
        <Route path="/register">
        {user ? <Redirect to="/"/> : <Register/>}
        </Route>
        <Route path="/login">
        {user ? <Redirect to="/"/> : <Login/>}
        </Route>
        <Route path="/post/:postId">
        {user ? <Single/> : <Redirect to="/login"/>}
        </Route>
        <Route path="/settings">
        {user ? <Settings/> : <Redirect to="/login"/>}
        </Route>
        <Route path="/write">
        {user ? <Write/> : <Redirect to="/login"/>}
        </Route>
      </Switch>
      
    </Router>
  );
}

export default App;
