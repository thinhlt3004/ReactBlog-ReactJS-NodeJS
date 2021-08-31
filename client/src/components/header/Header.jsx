import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">个人博客</span>
        <span className="headerTitleLg">Blog...</span>
      </div>
      <img
        src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjV8fGJsb2d8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
        alt=""
        className="headerImg"
      />
    </div>
  );
}
