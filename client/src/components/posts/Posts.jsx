import './posts.css';
import Post from './../post/Post';
import Skeleton from './../skeleton/Skeleton';

export default function Posts({posts}) {
    // console.log(posts);
    return (
        <div className="posts">
            {posts ?  posts.map((i) => (<Post key={i._id} post={i}/>)) : 
            <Skeleton type="feed" />}
        </div>
    )
}
