import './skeleton.css'

export default function Skeleton({type}) {
    const COUNTER = 6;
    const FeedSkeleton = () => (
        <div className="postSk">
            <div className="postSkImg"></div>
            <div className="postSkInfo">
                <div className="postCastSk"></div>
                <div className="postTitleSk"></div>
                <div className="postDateSk"></div>
                <div className="postDescSk"></div>
            </div>
        </div>
    );
    if (type === "feed") return Array(COUNTER).fill(<FeedSkeleton />);
    
}
