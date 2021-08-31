import './sidebar.css';
import {useEffect, useState} from 'react';
import {Facebook, Twitter, Pinterest, Instagram} from '@material-ui/icons';
import {useSelector} from 'react-redux';
import {userState$} from './../../redux/selectors/index.js';
import * as api from './../../api/index.js';
import { Link } from 'react-router-dom';
export default function Sidebar() {
    const [cate, setCate] = useState([]);
    const user = useSelector(userState$);
    useEffect(() => {
        const fetchCate = async () => {
            const res = await api.fetchAllCategories();
            setCate(res.data);
        }
        fetchCate();
    },[])

    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src={user.profilePicture ? user.profilePicture : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"} alt="" />
                <p>{user.username}</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATERGORIES</span>
                <ul className="sidebarList">
                    {cate.map(i => (
                        <Link key={i._id} to={`/?category=${i.name}`} className="links">
                            <li className="sidebarListItem">{i.name}</li>
                        </Link>
                    ))}
                    
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <Facebook className="sidebarIcon"/>
                    <Twitter className="sidebarIcon"/>
                    <Pinterest className="sidebarIcon"/>
                    <Instagram className="sidebarIcon"/>
                </div>
            </div>
        </div>
    )
}
