import { Link } from "react-router-dom";

function Header() {
    return (
        <header
        style={{
            padding: "10px 20px",
            borderBottom: "1px solid #ddd",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
        }}
        >
            <div>
                <Link to="/">아르바이트 스케줄러</Link>
            </div>
            <nav style={{ display: "flex", gap: "10px" }}>
                <Link to="/login">로그인</Link>
                <Link to="/register">회원가입</Link>
            </nav>
        </header>
    );
}

export default Header;
