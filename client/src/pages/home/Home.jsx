import './home.css';
import Header from './../../components/header/Header';
import Posts from './../../components/posts/Posts';
import Sidebar from './../../components/sidebar/Sidebar';
import {useEffect} from 'react';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import * as postActions from './../../redux/actions/postActions.js';
import {postsState$} from './../../redux/selectors/index.js';
export default function Home() {
    const dispatch = useDispatch();
    const posts = useSelector(postsState$);
    const {search} = useLocation();
    useEffect(() =>{
        dispatch(postActions.getPosts.getPostsRequest(search));
    },[search, dispatch])
    return (
        <div>
            <Header/>
                <div className="home">
                    <Posts posts={posts}/>
                    <Sidebar/>
                </div>
        </div>
    )
}
