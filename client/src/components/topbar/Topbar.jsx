import "./topbar.css";
import {
  Facebook,
  Twitter,
  Pinterest,
  Instagram,
  Search,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';
import {userState$} from './../../redux/selectors/index.js';
import createBrowserHistory from "history/createBrowserHistory";
import { useState, useEffect } from "react";
import * as api from './../../api/index.js';
import {useHistory} from 'react-router-dom';
export default function Topbar() {
  const user = useSelector(userState$);
  const [isSearch, setIsSearch] = useState(false);
  const history =  createBrowserHistory({ forceRefresh: true });
  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState([]);
  const notFetchHistory = useHistory();
  const handleLogOut = () => {
    localStorage.removeItem('token');
    history.push("/login");
  }
  useEffect(() =>{
    const fetchData = async () => {
     if(searchInput !== ''){
      const res = await api.searchData(searchInput);
      setData(res.data);
     }
    }
    fetchData();
  },[searchInput]);
  const handleRedirect = (id) => {
    setData([]);
    setSearchInput('');
    setIsSearch(false);
    notFetchHistory.push(`/post/${id}`);
  }
  return (
    <div className="top">
      <div className="topLeft">
        <Facebook className="topICon" />
        <Twitter className="topICon" />
        <Pinterest className="topICon" />
        <Instagram className="topICon" />
      </div>
      <div className="topCenter">
        <ul className="topList">
        {user ? <>
          <Link to="/" className="links">
            <li className="topListItem">HOME</li>
          </Link>
          <Link to="/" className="links">
            <li className="topListItem">ABOUT</li>
          </Link>
          <Link to="/" className="links">
            <li className="topListItem">CONTACT</li>
          </Link>
          <Link to="/write" className="links">
            <li className="topListItem">WRITE</li>
          </Link>
          <li className="topListItem" onClick={handleLogOut}>LOGOUT</li>
          </> : 
          <span className="titleTopBarCenter">Personal Blog...</span>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <>
          <Link to="/settings">
          <img
            className="topImg"
            src={user ? user.profilePicture :"https://i.pinimg.com/originals/7a/be/d5/7abed53718fdfb2cd7e58544898abf14.jpg"}
            alt=""
          />
          </Link>
          <Search className="topSearchIcon" onClick={(e) => setIsSearch(!isSearch)} />
          <div className="searchDivTopBar">
            {isSearch 
            ? <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" className="searchInputTopBar" placeholder="place title of post..." />
            : <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" className="searchInputTopBar off" placeholder="place title of post..." />}
            </div>
          <div className="searchBarDataBlock">
              {isSearch && data.length > 0 && data.map((i) => (             
              <span className="listData" onClick={(e) => handleRedirect(i._id)}>
                <img className="imgListData" src={i.photo} alt="" />
                <div className="contentData">
                  <span className="listDataTitle">{i.title}</span>
                  <span>{new Date(i.createdAt).toDateString()}</span>
                </div>
              </span>   
              ))}          
          </div>
          </>         
        ) : (
          <ul className="topList">
            <Link to="/login" className="links">
              <li className="topListItem">LOGIN</li>
            </Link>
            <Link to="/register" className="links">
              <li className="topListItem">REGISTER</li>
            </Link>
          </ul>
        )}
        
      </div>
    </div>
  );
}
