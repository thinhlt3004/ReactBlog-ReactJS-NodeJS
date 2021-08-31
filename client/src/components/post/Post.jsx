import './post.css';
import {Link} from 'react-router-dom';
export default function Post({post}) {
    return (
        <div className="post">
            <img className="postImg" src={post.photo ? post.photo : 'https://efii.co/assets/images/default-post-pic.png'} alt="" />
            <div className="postInfo">
                <div className="postCast">
                    {post.categories && post.categories.map(i => (
                        <span className="postCast">{i.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className="links">
                    <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">
                {post.desc}
            </p>
        </div>
    )
}
