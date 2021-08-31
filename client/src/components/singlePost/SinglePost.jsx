import './singlePost.css';
import {Edit, Delete} from '@material-ui/icons';
import {useParams } from 'react-router-dom';
import * as api from './../../api/index.js';
import { useEffect, useState, useCallback} from 'react';
import {Link} from 'react-router-dom';
import * as postActions from './../../redux/actions/postActions.js';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import {userState$} from './../../redux/selectors/index.js';
export default function SinglePost() {
    const postId = useParams().postId;
    const user = useSelector(userState$);
    const history = useHistory();
    const dispatch = useDispatch();
    const [post, setPost] = useState({});
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    useEffect(() => {
        const fetchOnePost = async() => {
            try {
                const res = await api.fetchPostByID(postId);
                setPost(res.data);
                setDesc(res.data.desc);
                setTitle(res.data.title);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOnePost();
    },[postId])
    const handleDelete = useCallback(() =>{
        dispatch(postActions.deletePost.deletePostRequest(post._id));
        history.push("/");
    },[dispatch, post._id, history ])
    const handleUpdate = useCallback(() =>{
        const payload = {
            id: post._id,
            data: {
                title:title,
                desc:desc,
                username:post.username,
            },
        }
        dispatch(postActions.updatePost.updatePostRequest(payload));
        setUpdateMode(!updateMode);
    },[desc, title, post.username,post._id ,dispatch, updateMode, setUpdateMode]);
    console.log(post);
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                <img src={post.photo ? post.photo : "https://efii.co/assets/images/default-post-pic.png"} alt="" className="singlePostImg" />
                {updateMode 
                ? <div className="singlePostUpdateTitle">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Write title of this post..." autoFocus className="singlePostTitleInput" /> 
                    <div className="singleButtonBlock">
                        <button className="UpdateSinglePostButtonUpdate" onClick={handleUpdate}>Update & Close</button>                       
                    </div>    
                </div>
                : <h1 className="singlePostTitle">{title}
                    <div className="singlePostEdit">
                        {post.username === user.username && <><Edit className="singlePostIcon" onClick={(e) => setUpdateMode(!updateMode)}/>
                        <Delete className="singlePostIcon" onClick={handleDelete}/></>}
                    </div>
                  </h1>
                }
                <div className="singlePostInfo">
                    <span className="singlePostAuthor">Author:
                    <Link to={`/?username=${post.username}`} className="links">
                        <b>{post.username}</b>
                     </Link>
                     </span>
                    <span className="singlePostAuthor">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode 
                    ? <textarea type="text" onChange={(e) => setDesc(e.target.value)} value={desc} placeholder="Write content of this post..."  className="singlePostDescInput" /> 
                    : <p className="singlePostDesc">{desc}</p>
                }
            </div>
        </div>
    )
}
