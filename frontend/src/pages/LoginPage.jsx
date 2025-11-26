import { useState } from "react";

function LoginPage() {
    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("로그인 시도:", loginId, password);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디</label>
                    <input
                        value={loginId}
                        onChange={(e) => setLoginId(e.target.value)}
                    />
                    </div>
                    <div>
                    <label>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">로그인</button>
            </form>
        </div>
    );
}

export default LoginPage;
